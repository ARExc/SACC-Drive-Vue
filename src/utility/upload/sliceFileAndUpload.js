import request from "@/utility/api/request";
import store from "@/store";
import {computed} from "vue";
import createFileDto from "@/utility/createFileDto";
import {ElMessage} from "element-plus";

async function sliceFileAndUpload(file) {
    let isPaused = computed(() => store.state.states.isPause);
    let isCancelled = computed(() => store.state.states.isCancel);
    let filePid = computed(() => store.state.file.filePid);
    let fileMd5 = computed(() => store.state.file.fileMd5);
    const chunkSize = 10 * 1024 * 1024; // 切片大小，10MB一片
    const chunkCount = Math.ceil(file.size / chunkSize); // 切片数量

    try {
        let startUploadRes = await request.post('/api/priv/file/startUpload', {
            fileName: file.name,
            fileSize: file.size,
            chunkTotal: chunkCount,
            filePid: filePid.value
        });

        let identifier = startUploadRes.data.data.code; // 用于区别用户一次上传的多个文件的唯一识别码
        if (startUploadRes.data.code !== 1) {
            throw new Error(startUploadRes.data.errorMsg);
        }

        // 递归函数处理每个分片
        const uploadChunk = async (currentChunk) => {
            if (isCancelled.value) {
                ElMessage.info('上传被取消');
                store.commit('states/setIsCancel', false);
                store.commit('states/setProgress', 0);
                store.commit('states/setStartUpload', false);
                return;
            }

            if (isPaused.value) {
                console.log('上传暂停');
                setTimeout(() => uploadChunk(currentChunk), 500);
                return;
            }

            const start = currentChunk * chunkSize;
            const end = start + chunkSize > file.size ? file.size : start + chunkSize;
            const blob = file.slice(start, end);
            const formData = new FormData();
            formData.append('file', blob, file.name);
            formData.append('chunkNumber', currentChunk);
            formData.append('chunkTotal', chunkCount);
            formData.append('code', identifier);

            let uploadRes = await request.post('/api/priv/file/upload', formData);

            if (uploadRes.data.code !== 1) {
                throw new Error(uploadRes.data.errorMsg);
            }

            store.commit('states/setProgress', (currentChunk / chunkCount) * 100);
            console.log('分片上传成功', currentChunk);

            if (currentChunk < chunkCount - 1) {
                await uploadChunk(currentChunk + 1);
            } else {
                if(fileMd5.value===''){
                    //等待md5完成
                }
                // 所有分片完成后进行最终校验
                let checkRes = await request.post('/api/priv/file/check', {
                    md5: fileMd5.value,
                    code: identifier
                });
                if (checkRes.data.data.status !== 1) {
                    ElMessage.error('文件完整性验证失败');
                    throw new Error(checkRes.data.errorMsg);
                }
                console.log('文件完整性验证成功');
                const newFile = createFileDto(file);
                store.commit('file/setFile', newFile);
                ElMessage.success('上传成功');
                store.commit('states/setIsCancel', false);
                store.commit('states/setStartUpload', false);
            }
        };

        // 开始上传第一个分片
        await uploadChunk(0);

    } catch (error) {
        console.error('上传失败:', error.message);
        throw new Error(error.message);

    }
}

export default sliceFileAndUpload;
