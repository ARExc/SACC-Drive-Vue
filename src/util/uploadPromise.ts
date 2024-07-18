import {startUpload} from "@/api/upload/startUpload.ts";
import {upload} from "@/api/upload/upload.ts";
import axios from "axios";

async function uploadPromise(file: File): Promise<string | Error | null> {

  const chunkSize = 10 * 1024 * 1024; // 切片大小，10MB一片
  const chunkCount = Math.ceil(file.size / chunkSize); // 切片数量
  const isCancelled = {value: false}; // 用于标记上传是否被取消
  const isPaused = {value: false}; // 用于标记上传是否被暂停

  try {

    // 上传第一步：开始上传
    const startUploadRes = await startUpload(
        {
          fileName: file.name,
          fileSize: file.size,
          chunkTotal: chunkCount,
          filePid: ''
        }
    )
    // console.log('startUploadRes:', startUploadRes);
    const identifier: string = startUploadRes.data.data.code; // 用于区别用户一次上传的多个文件的唯一识别码
    if (startUploadRes.data.code !== 1) {
      throw new Error(startUploadRes.data.errorMsg)//要消除这个警告，只要将这个抛出封装成一个函数即可
    }
    // console.log('identifier:', identifier);

    // 递归函数处理每个分片
    const uploadChunk = async (currentChunk: number) => {

      //取消上传
      if (isCancelled.value) {
        console.log('上传被取消');
        return;
      }

      //TODO: 暂停上传
      if (isPaused.value) {
        console.log('上传暂停');
        // 使用事件驱动机制来恢复，在主线程中发送恢复上传的消息
        await new Promise((resolve) => {
          const resumeListener = () => {
            isPaused.value = false;
            self.removeEventListener('message', resumeListener);
            resolve(null);
          };
          self.addEventListener('message', resumeListener);
        });
      }

      const start = currentChunk * chunkSize;
      const end = start + chunkSize > file.size ? file.size : start + chunkSize;
      const blob = file.slice(start, end);
      const formData = new FormData();
      formData.append('file', blob, file.name);
      formData.append('chunkNumber', currentChunk.toString());
      formData.append('chunkTotal', chunkCount.toString());
      formData.append('code', identifier);

      //上传第二步：依次上传分片
      const uploadRes = await upload(formData);

      if (uploadRes.data.code !== 1) {
        console.log('Chunk upload failed', currentChunk);
        throw new Error(uploadRes.data.errorMsg);
      }

      console.log(file.name + '文件分片上传成功', currentChunk);

      if (currentChunk < chunkCount - 1) {
        await uploadChunk(currentChunk + 1);
      } else {
        //上传第三步：检查文件完整性（单独提取出来，避免在这个函数中使用md5作参数）
        // console.log('----------test----------');
      }
    };
    // 开始上传第一个分片
    await uploadChunk(0);
    // 第二步结束之后，返回文件唯一标识符，用于第三步
    return (identifier);

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // error 是 AxiosError 类型
      console.error('Axios error:', error.message);
      throw new Error(error.message)
    } else if (error instanceof Error) {
      // error 是 Error 类型
      console.error('General error:', error.message);
      throw new Error(error.message)
    } else {
      // 处理未知类型的错误
      console.error('Unknown error', error);
      throw new Error(error as string)
    }
  }
}

export default uploadPromise;
