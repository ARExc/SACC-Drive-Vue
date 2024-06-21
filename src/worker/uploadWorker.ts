import axios from "axios";
import {startUpload} from "@/api/upload/startUpload.ts";
import {upload} from "@/api/upload/upload.ts";
import {check} from "@/api/upload/check.ts";

self.onmessage = async (e) => {

  const {file, fileMd5} = e.data;

  const chunkSize = 10 * 1024 * 1024; // 切片大小，10MB一片
  const chunkCount = Math.ceil(file.size / chunkSize); // 切片数量
  const isCancelled = {value: false}; // 用于标记上传是否被取消
  const isPaused = {value: false}; // 用于标记上传是否被暂停

  try {
    const startUploadRes = await startUpload(
      {
        fileName: file.name,
        fileSize: file.size,
        chunkTotal: chunkCount,
        filePid: ''
      }
    )
    const identifier = startUploadRes.data.data.code; // 用于区别用户一次上传的多个文件的唯一识别码
    if (startUploadRes.data.code !== 1) {
      self.postMessage({error: startUploadRes.data.errorMsg})
    }

    // 递归函数处理每个分片
    const uploadChunk = async (currentChunk: number) => {
      if (isCancelled.value) {
        console.log('上传被取消');
        return;
      }

      if (isPaused.value) {
        console.log('上传暂停');
        console.log('Upload paused');
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

      try {
        const uploadRes = await upload(formData);

        if (uploadRes.data.code !== 1) {
          console.log('Chunk upload failed', currentChunk);
          self.postMessage({error: uploadRes.data.errorMsg});
          return;
        }

        console.log('Chunk uploaded successfully', currentChunk);

        if (currentChunk < chunkCount - 1) {
          await uploadChunk(currentChunk + 1);
        } else {
          if (!fileMd5) {
            // Wait for MD5 calculation if needed
          }
          const checkRes = await check(fileMd5, identifier);
          if (checkRes.data.data.status !== 1) {
            console.log('File integrity check failed');
            self.postMessage({error: checkRes.data.errorMsg});
            return;
          }
          debugger;
          console.log('File integrity check succeeded');
          self.postMessage({success: 'File uploaded and verified successfully'});
        }
      } catch (error) {
        console.error('Chunk upload error:', error);
        self.postMessage({error: error || 'Chunk upload failed'});
      }
    };

    // 开始上传第一个分片
    await uploadChunk(0);

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // error 是 AxiosError 类型
      console.error('Axios error:', error.message);
      self.postMessage({error: error.message})
    } else if (error instanceof Error) {
      // error 是 Error 类型
      console.error('General error:', error.message);
      self.postMessage({error: error.message})
    } else {
      // 处理未知类型的错误
      console.error('Unknown error', error);
      self.postMessage({error: error})
    }
  }
}
self.onerror = (e) => {
  if (e instanceof ErrorEvent) {
    console.error('Worker error:', e.message);
  } else {
    console.error('Worker error:', e);
  }
}
