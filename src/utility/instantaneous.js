import SparkMD5 from "spark-md5";
import store from "@/store";


const instantaneousTransmission = (file) => {
    console.log(file);
    console.log('秒传');
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        //当FileReader成功完成对文件的读取操作时，触发onload事件，并传递事件对象e给事件处理函数
        //此时只是设置了文件读取完成的回调函数，但是并没有开始读取文件。
        reader.onload = (e) => {
            const arrayBuffer = e.target.result;
            console.log(arrayBuffer);
            const spark = new SparkMD5.ArrayBuffer();
            spark.append(arrayBuffer);//不能传入file类型，只能传入ArrayBuffer，否则md5永远是一样的
            let hash = spark.end(false);
            store.commit('file/setUpload', true);
            //在这里发起hash检查请求
            resolve(file.type);
            console.log('文件MD5:', hash);
        };
        reader.onerror = (e) => {
            console.error(e);

        };
        reader.readAsArrayBuffer(file);//开始异步读取文件内容。这个方法会立即返回，而文件的读取操作将在后台进行

    });
};
export default instantaneousTransmission;