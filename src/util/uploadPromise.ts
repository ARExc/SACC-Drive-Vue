function uploadPromise(file: File, fileMd5: string) {
  return new Promise( (resolve, reject) => {
    const worker = new Worker(new URL('../worker/uploadWorker.ts', import.meta.url), {type: 'module'});
    worker.postMessage({file, fileMd5});
    worker.onmessage = (e) => {
      worker.terminate();
      if (e.data.success) {
        console.log('文件上传成功');
        resolve(e.data.success);
      } else if (e.data.error) {
        //文件读取失败
        reject(new Error(`Worker failed with error: ${e.data.error}`));
      }
    };
    worker.onerror = (e) => {
      worker.terminate();
      console.error('Worker error:', e.message);
      reject(new Error(`Worker error: ${e.message}`));
    }
  });
}

export default uploadPromise;
