import sparkMD5 from 'spark-md5';
//self代表子线程自身，即子线程的全局对象。
//接收主线程的message，e.data即主线程中的file
//异步的计算文件的md5值，计算完成后，通过postMessage方法将结果发送给主线程
self.addEventListener("message", (e) => {
    const file = e.data;
    const reader = new FileReader();
    //当FileReader成功完成对文件的读取操作时，触发onload事件，并传递事件对象e给事件处理函数
    reader.onload = (e) => { //此时只是设置了文件读取完成的回调函数，但是并没有开始读取文件。
        const arrayBuffer = e.target.result;
        const spark = new sparkMD5.ArrayBuffer();
        spark.append(arrayBuffer);//不能传入file类型，只能传入ArrayBuffer，否则md5永远是一样的
        const hash = spark.end();
        self.postMessage({hash});//发送消息回主线程
    };
    reader.onerror = (e) => {
        self.postMessage({error: '文件读取失败'});
    };
    reader.readAsArrayBuffer(file);//开始异步读取文件内容。这个方法会立即返回，而文件的读取操作将在后台进行
}, false);//false参数指的是事件监听器在事件的冒泡阶段而不是捕获阶段被调用。