import request from "@/utility/api/request";
import store from "@/store";
import {computed, watch} from "vue";
import createFileDto from "@/utility/createFileDto";
import {ElMessage} from "element-plus";

function sliceFileAndUpload(file) {
    let isPaused = computed(() => store.state.states.isPause);
    let isCancelled = computed(() => store.state.states.isCancel);
    let filePid = computed(() => store.state.file.filePid);
    let fileMd5 = computed(() => store.state.file.fileMd5);
    const chunkSize = 10 * 1024 * 1024; // 切片大小，10MB一片
    const chunkCount = Math.ceil(file.size / chunkSize); // 切片数量
    let currentChunk = 0;//当前切片序号

    //保证在上传完最后一个分片的时候，md5已经计算好了
    const waitForMd5 = () => new Promise(resolve => {
        const unwatch = watch(fileMd5, (newValue) => {
            if (newValue !== '') {
                resolve(newValue);
                unwatch();
            }
        });
    });
    return new Promise((resolve, reject) => {
        //先通知后端，准备开始上传，并提供所需的信息
        request.post('/api/priv/file/startUpload', {
            fileName: file.name,
            fileSize: file.size,
            chunkTotal: chunkCount,
            filePid: filePid.value
        }).then(res => {
            let identifier = res.data.data.code;//用于区别用户一次上传的多个文件的唯一识别码
            if (res.data.code === 1) {
                //后端返回1，表示可以继续上传
                const checkAndUploadChunk = (formData, currentChunk, chunkCount) => {
                    //直接上传分片
                    request.post('/api/priv/file/upload',
                        formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data' // axios 通常会自动设置，这里显式声明可省略
                            }
                        }
                    ).then(res => {
                        if (res.data.code === 1) {
                            // 上传成功，继续处理下一个分片，增加进度条数字
                            store.commit('states/setProgress', (currentChunk) / chunkCount * 100);
                            // console.log('进度:', currentChunk / chunkCount * 100 + '%');
                            console.log('分片上传成功');
                        } else {
                            //上传失败
                            console.log('分片上传失败')
                            reject(res.data.errorMsg);
                        }
                    }).catch(err => {
                        reject(err);
                    });
                    if (currentChunk < chunkCount) {
                        loadNext(); // 继续处理下一个分片
                    } else {
                        //处理最后一个分片
                        request.post('/api/priv/file/upload', formData)
                            .then(async res => {
                                if (res.data.code === 1) {
                                    // await waitForMd5();//等待md5值计算完成
                                    //断言：md5的计算一定比文件上传更快
                                    if (fileMd5.value === '') {
                                        reject('md5值计算失败');
                                    }
                                    //通知后端文件上传完成，完成校验
                                    request.post('/api/priv/file/check', {
                                        md5: fileMd5.value,
                                        code: identifier
                                    }).then(res => {
                                        if (res.data.data.status === 1) {
                                            console.log('文件完整性验证成功');
                                            const newFile = createFileDto(file)
                                            //向vuex中添加一个file，用于在Disk页面中显示新的文件
                                            store.commit('file/setFile', newFile);
                                            resolve(res);
                                        } else {
                                            ElMessage.error('文件完整性验证失败');
                                            reject(res.data.errorMsg);
                                        }
                                    }).catch(err => {
                                        console.error(err);
                                    });
                                } else {
                                    reject(res.data.errorMsg);
                                }
                            }).catch(err => {
                            //上传失败
                            reject(err);
                        });
                    }
                };
                const loadNext = () => {
                    if (isCancelled.value) {
                        ElMessage.info('上传被取消')
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
                        ElMessage.info('上传暂停')
                        console.log("上传暂停");
                        setTimeout(loadNext, 500); // 每隔一段时间检查是否应该继续上传
                        return;
                    }
                    const start = currentChunk * chunkSize >= file.size ? 0 : currentChunk * chunkSize
                    const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
                    const blob = file.slice(start, end);
                    const formData = new FormData();
                    formData.append('file', blob, file.name); // 'file' 是后端期望的字段名
                    formData.append('chunkNumber', currentChunk);
                    formData.append('chunkTotal', chunkCount);
                    formData.append('code', identifier);
                    const fileReader = new FileReader();
                    fileReader.readAsArrayBuffer(blob);
                    fileReader.onload = function (e) {
                        currentChunk++;
                        checkAndUploadChunk(formData, currentChunk, chunkCount);
                    };
                    fileReader.onerror = function (e) {
                        reject(e);
                    }
                };
                loadNext(); // 开始处理第一个分片
            } else {
                reject(res.data.errorMsg);
            }
        }).catch(err => {
            return new Promise((resolve, reject) => {
                reject(err);
            });
        })
    });
}

export default sliceFileAndUpload;
