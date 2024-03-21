import store from "@/store";
import createFileDto from "@/utility/createFileDto";
import request from "@/utility/request";

const instantaneousTransmission = (file) => {
    return new Promise((resolve, reject) => {

        //创建worker
        const worker = new Worker(new URL('../worker/md5Worker.js', import.meta.url));
        //将file传递给worker
        worker.postMessage(file);
        //接收worker返回的数据
        worker.onmessage = (e) => {
            if (e.data.hash) {
                // console.log('文件MD5:', e.data.hash);

                const newFile = createFileDto(file)

                // store.commit('file/setUpload', true);
                //向vuex中添加一个file，用于在Disk页面中显示新的文件
                store.commit('file/setFile', newFile);

                //检查文件是否已经上传过
                request.post('/api/priv/file/checkChunks', {
                    md5: e.data.hash
                }).then(res => {
                    //这个response里应该有一个字段，用于判断文件是否已经上传过
                    resolve(res);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                })
            } else if (e.data.error) {
                //文件读取失败
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