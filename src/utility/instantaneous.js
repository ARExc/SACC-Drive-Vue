import store from "@/store";
// import request from "@/utility/request";

const instantaneousTransmission = (file) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(new URL('./md5Worker.js', import.meta.url));
        worker.postMessage(file);
        worker.onmessage = (e) => {
            if (e.data.hash) {
                console.log('文件MD5:', e.data.hash);
                const newFile = {
                    fileName: file.name,
                    folderType: 0,
                    fileCategory: 5,
                    fileSize: file.size,
                };
                const result = file.type;
                console.log(result);
                //1：视频 2：音频 3：文档 4：图片 5：其他
                if (/^video\//.test(result)) {
                    newFile.fileCategory = 1;
                } else if (/^audio\//.test(result)) {
                    newFile.fileCategory = 2;
                } else if (/^text\//.test(result)) {
                    newFile.fileCategory = 3;
                } else if (/^image\//.test(result)) {
                    newFile.fileCategory = 4;
                }
                store.commit('file/setUpload', true);
                store.commit('file/setFile', newFile);

                // request.post('/api/priv/file/checkChunks', {
                //     md5: hash
                // }).then(res => {
                //     resolve(newFile);
                //     resolve();
                // }).catch(err => {
                //     console.log(err);
                // })
                resolve(newFile);
            } else if (e.data.error) {
                reject(e.data.error);
            }
        }
        worker.onerror = (e) => {
            console.error('Worker error:', e);
            reject(e);
        }
    });
};
export default instantaneousTransmission;