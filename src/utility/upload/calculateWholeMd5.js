// 用于上传文件的工具函数
const calculateWholeMd5 = (file) => {
    return new Promise((resolve, reject) => {

        //创建worker
        const worker = new Worker(new URL('../worker/md5Worker.js', import.meta.url));
        //将file传递给worker
        worker.postMessage(file);
        //接收worker返回的数据
        worker.onmessage = (e) => {
            if (e.data.hash) {
                console.log('文件MD5:', e.data.hash);
                resolve(e.data.hash);
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
export default calculateWholeMd5;