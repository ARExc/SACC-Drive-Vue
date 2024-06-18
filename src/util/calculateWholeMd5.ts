const calculateWholeMd5 = (file: File) => {
  return new Promise((resolve, reject) => {
    console.log(file)
    const worker = new Worker(new URL('/src/workers/md5Worker.ts', import.meta.url));
    worker.postMessage({file});
    worker.onmessage = (e) => {
      worker.terminate();
      if (e.data.hash) {
        // console.log('文件MD5:', e.data.hash);
        resolve(e.data.hash);
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
};

export default calculateWholeMd5;
