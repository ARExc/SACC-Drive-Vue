import SparkMD5 from "spark-md5";
import request from "@/utility/request";
import store from "@/store";
import {computed} from "vue";
import createFileDto from "@/utility/createFileDto";

function sliceFileAndUpload(file) {
    let isPaused = computed(() => store.state.states.isPause);
    let isCancelled = computed(() => store.state.states.isCancel);
    // let filePid = computed(() => store.getters.filePid);
    let fileMd5 = computed(() => store.state.file.fileMd5);
    const chunkSize = 10 * 1024 * 1024; // 切片大小，10MB一片
    const chunkCount = Math.ceil(file.size / chunkSize); // 切片数量
    const spark = new SparkMD5.ArrayBuffer();
    let currentChunk = 0;//当前切片序号
    console.log('切片数量:', chunkCount);

    return new Promise((resolve, reject) => {
        //先通知后端，准备开始上传，并提供所需的信息
        request.post('/api/priv/file/startUpload', {
            fileName: file.name,
            fileSize: file.size,
            chunkTotal: chunkCount,
            chunkNumber: currentChunk,
            chunkSize: chunkSize,
        }).then(res => {
            let identifier = res.data.data.code;//用于区别用户一次上传的多个文件的唯一识别码
            if (res.data.code === 1) {
                //后端返回1，表示可以继续上传
                const checkAndUploadChunk = (hash, blob, currentChunk, chunkCount) => {
                    //直接上传分片
                    request.post('/api/priv/file/upload', {
                        md5: hash,
                        chunkNumber: currentChunk,
                        file: blob,
                        code: identifier
                    }).then(res => {
                        if (res.data.code === 1) {
                            // 上传成功，继续处理下一个分片，增加进度条数字
                            store.commit('states/setProgress', (currentChunk) / chunkCount * 100);
                            // console.log('进度:', currentChunk / chunkCount * 100 + '%');
                            console.log('分片上传成功');
                        } else {
                            //上传失败
                            reject(res.data.errorMsg);
                        }
                    }).catch(err => {
                        reject(err);
                    });

                    if (currentChunk < chunkCount) {
                        loadNext(); // 继续处理下一个分片
                    } else {
                        //处理最后一个分片
                        const finalHash = spark.end(false);//传递false时，SparkMD5对象不会在调用end()后重置，这意味着你可以继续添加数据进行计算
                        request.post('/api/priv/file/upload', {
                            md5: hash,
                            chunkNumber: currentChunk,
                            file: blob,
                            code: identifier
                        }).then(res => {
                            while (fileMd5.value === '') {
                                fileMd5.value += '';//让计算属性刷新
                            }//等待md5值计算完成
                            //通知后端文件上传完成，完成校验
                            request.post('/api/priv/file/check', {
                                md5: fileMd5.value
                            }).then(res => {
                                console.log('文件完整性验证成功');
                                const newFile = createFileDto(file)
                                //向vuex中添加一个file，用于在Disk页面中显示新的文件
                                store.commit('file/setFile', newFile);
                                resolve(res);
                            }).catch(err => {
                                console.error(err);
                            });
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
                        checkAndUploadChunk(hash, blob, currentChunk, chunkCount);
                    };
                    fileReader.onerror = function (e) {
                        reject(e);
                    }
                };
                loadNext(); // 开始处理第一个分片
            }
        }).catch(err => {
            return new Promise((resolve, reject) => {
                reject(err);
            });
        })
    });
}

export default sliceFileAndUpload;
