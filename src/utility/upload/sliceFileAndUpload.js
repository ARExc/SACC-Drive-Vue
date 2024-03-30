import SparkMD5 from "spark-md5";
import request from "@/utility/request";
import store from "@/store";
import {computed} from "vue";
import createFileDto from "@/utility/createFileDto";

function sliceFileAndUpload(file, fileMd5) {
    return new Promise((resolve, reject) => {
        let isPaused = computed(() => store.state.states.isPause);
        let isCancelled = computed(() => store.state.states.isCancel);
        let filePid = computed(() => store.getters.filePid);
        const chunkSize = 10 * 1024 * 1024; // 切片大小，10MB
        const chunkCount = Math.ceil(file.size / chunkSize); // 切片数量
        console.log('切片数量:', chunkCount);
        const spark = new SparkMD5.ArrayBuffer();
        let currentChunk = 0;

        const checkAndUploadChunk = (hash, blob, currentChunk, chunkCount, chunkSize) => {
            //直接上传分片
            request.post('/api/priv/file/upload', {
                md5: hash,
                chunkNumber: currentChunk,
                chunkTotal: chunkCount,
                chunkSize: chunkSize,
                file: blob
            }).then(res => {
                // 上传成功，继续处理下一个分片，增加进度条数字
                store.commit('states/setProgress', (currentChunk) / chunkCount * 100);
                // console.log('进度:', currentChunk / chunkCount * 100 + '%');
                console.log('分片上传成功');
            }).catch(err => {
                reject(err);
            });

            if (currentChunk < chunkCount) {
                loadNext(); // 继续处理下一个分片
            } else {
                //处理最后一个分片
                const finalHash = spark.end(false);//传递false时，SparkMD5对象不会在调用end()后重置，这意味着你可以继续添加数据进行计算
                request.post('/api/priv/file/upload', {
                    md5: finalHash,
                    fileName: file.name
                }).then(res => {
                    console.log('最后的MD5:', finalHash);
                    console.log('文件完整性验证成功');
                    // store.commit('file/setUpload', true);
                    const newFile = createFileDto(file)
                    //向vuex中添加一个file，用于在Disk页面中显示新的文件
                    store.commit('file/setFile', newFile);
                    resolve(res);
                }).catch(err => {
                    //上传失败
                    reject(err);
                });
            }
        };
        const loadNext = () => {
            if (isCancelled.value) {
                console.log("上传被取消");
                //把取消上传的状态设置为false，使下次上传时的样式正常
                store.commit('states/setIsCancel', false);
                //把进度条的进度设置为0
                store.commit('states/setProgress', 0);
                //取消上传进度条的显示
                store.commit('states/setStartUpload', false);
                setTimeout(() => {
                    window.location.reload();
                }, 800);
                return;
            }
            if (isPaused.value) {
                console.log("上传暂停");
                setTimeout(loadNext, 500); // 每隔一段时间检查是否应该继续上传
                return;
            }
            const start = currentChunk * chunkSize;
            const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
            const blob = file.slice(start, end);
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(blob);
            fileReader.onload = function (e) {
                spark.append(e.target.result); // Append array buffer
                currentChunk++;
                let hash = spark.end(false); // 计算当前分片的hash
                checkAndUploadChunk(hash, blob, currentChunk, chunkCount, chunkSize);
            };
            fileReader.onerror = function (e) {
                reject(e);
            }
        };
        loadNext(); // 开始处理第一个分片
    });
}

export default sliceFileAndUpload;
