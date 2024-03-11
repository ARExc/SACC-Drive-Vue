import SparkMD5 from "spark-md5";
import request from "@/utility/request";
function sliceFileAndCalculateMD5(file) {
    const chunkSize = 2*1024*1024; //切片大小，2MB
    const chunkCount = Math.ceil(file.size / chunkSize);//切片数量
    console.log('文件大小:', file.size , '切片数量:', chunkCount);
    const spark = new SparkMD5.ArrayBuffer();
    let currentChunk = 0;

    function loadNext() {
        const fileReader = new FileReader();
        const start = currentChunk * chunkSize;
        const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
        fileReader.readAsArrayBuffer(file.slice(start, end));
        fileReader.onload = function (e) {//当FileReader成功完成对文件的读取操作时，触发onload事件，并传递事件对象e给事件处理函数。
            spark.append(e.target.result); // Append array buffer
            currentChunk++;

            if (currentChunk < chunkCount) {
                //这里就应该检查每一个分片的MD5是否存在了，如果存在了就不再计算了
                console.log('开始计算MD5');
                let hash= spark.end(false);//传递false时，SparkMD5对象不会在调用end()后重置，这意味着你可以继续添加数据进行计算
                request.post('/api/pub/file/checkFileMd5',{md5:hash})
                    .then(res=>{
                        if(res.data.code===200){
                            console.log('这个文件分片已存在');
                            console.log(res.data.data);
                            loadNext();
                        }else{
                            console.log('这个文件分片不存在');
                            request.post('api/pub/file/uploadFile',{})
                        }

                    }).catch(err=>{
                    console.log(err);
                })
                console.log('文件MD5:', hash);
                loadNext();
            } else {
                const finalHash = spark.end(false);
                console.log('文件MD5:', finalHash);
                // 在这里发起hash检查请求
            }
        };
    }
    loadNext();
}
export default sliceFileAndCalculateMD5;