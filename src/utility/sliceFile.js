import SparkMD5 from "spark-md5";
import request from "@/utility/request";
import store from "@/store";
import {computed} from "vue";
import createFileDto from "@/utility/createFileDto";

function sliceFile(file) {
    return new Promise((resolve, reject) => {
        let isPaused = computed(() => store.state.states.isPause);
        let isCancelled = computed(() => store.state.states.isCancel);
        const chunkSize = 2 * 1024 * 1024; // 切片大小，2MB
        const chunkCount = Math.ceil(file.size / chunkSize); // 切片数量
        console.log('切片数量:', chunkCount);
        const spark = new SparkMD5.ArrayBuffer();
        let currentChunk = 0;

        const checkAndUploadChunk = (hash, blob, currentChunk, chunkCount, chunkSize) => {
            request.post('/api/priv/file/checkChunks', {
                md5: hash
            }).then(res => {
                if (res.data.status === 1) {
                    console.log('这个文件分片已存在');
                    console.log(res.data.data);
                } else {
                    request.post('/api/priv/file/upload', {
                        md5: hash,
                        chunkNumber: currentChunk,
                        chunkTotal: chunkCount,
                        chunkSize: chunkSize,
                        file: blob
                    }).then(res => {
                        store.commit('states/setProgress', (currentChunk) / chunkCount * 100);
                        // console.log('进度:', currentChunk / chunkCount * 100 + '%');
                        console.log('分片上传成功');
                    }).catch(err => {
                        reject(err);
                    });
                }
                if (currentChunk < chunkCount) {
                    loadNext(); // 继续处理下一个分片
                } else {
                    const finalHash = spark.end(false);//传递false时，SparkMD5对象不会在调用end()后重置，这意味着你可以继续添加数据进行计算
                    console.log('最后的MD5:', finalHash);
                    request.post('/api/priv/file/upload', {
                        md5: finalHash,
                        fileName: file.name
                    }).then(res => {
                        console.log('文件完整性验证成功');
                        store.commit('file/setUpload', true);
                        const newFile = createFileDto(file)
                        store.commit('file/setFile', newFile);
                        resolve(finalHash);
                    }).catch(err => {
                        reject(err);
                    });
                }
            }).catch(err => {
                reject(err);
            });
        };

        const loadNext = () => {
            if (isCancelled.value) {
                console.log("上传被取消");
                store.commit('states/setStartUpload', false);
                store.commit('states/setIsCancel', false);
                store.commit('states/setProgress', 0);
                // debugger;
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
        // reject('上传被取消');
    });
}

export default sliceFile;
