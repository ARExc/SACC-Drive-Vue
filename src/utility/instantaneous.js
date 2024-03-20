import store from "@/store";
import createFileDto from "@/utility/createFileDto";
// import request from "@/utility/request";

const instantaneousTransmission = (file) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(new URL('./md5Worker.js', import.meta.url));
        worker.postMessage(file);
        worker.onmessage = (e) => {
            if (e.data.hash) {
                console.log('文件MD5:', e.data.hash);
                const newFile = createFileDto(file)
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