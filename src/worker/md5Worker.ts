import sparkMD5 from 'spark-md5';

self.addEventListener('message', (e) => {
  const file = e.data.file;
  const reader = new FileReader();
  reader.onload = (e) => {
    const arrayBuffer = e.target?.result;
    if(arrayBuffer instanceof ArrayBuffer) {
      const spark = new sparkMD5.ArrayBuffer();
      spark.append(arrayBuffer);//不能传入file类型，只能传入ArrayBuffer，否则md5永远是一样的
      const hash = spark.end();
      self.postMessage({hash});//发送消息回主线程
    }else{
      self.postMessage({error: '文件读取失败'});
    }
  }
  reader.onerror = () => {
    self.postMessage({error: '文件读取失败'});
  }
  reader.readAsArrayBuffer(file);
})

