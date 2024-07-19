import style from "./styles/ActionArea.module.scss";
import {Button, ConfigProvider} from "antd";
import React, {useRef} from "react";
import {v4 as uuidv4} from 'uuid';
import useUploadStore from "@/store/uploadStore.ts";
import verifyPromise from "@/util/verifyPromise.ts";

interface FileQueue {
  file: File;
  uuid: string;
}

const ActionArea = () => {

  const inputRef = useRef<HTMLInputElement>(null);
  const {addUploadFile, addFileCount, subtractFileCount, removeFile, changeState} = useUploadStore();

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //TODO:多文件上传
    const files: FileList | null = e.target.files;//获取用户选择的所有文件，此处是引用传递，需要复制一份
    if (files !== null) {
      const fileArr = Array.from(files);
      e.target.value = '';// 重置input，允许重新上传相同文件
      const uploadQueue: FileQueue[] = []; // 可以操作的上传队列

      //用于在传输列表中显示文件名，文件大小，上传进度等信息，一次性显示所有文件，只是状态不同
      for (let i = 0; i < fileArr.length; i++) {
        const file = fileArr[i];
        const uuid = uuidv4();//生成uuid，用于文件上传状态控制
        const fileSizeInMB = +(file.size / 1024 / 1024).toFixed(2) !== 0 ? +(file.size / 1024 / 1024).toFixed(2) : 0.01;
        if (fileSizeInMB > 5120) {
          alert('文件大小不能超过5GB，' + file.name + '上传失败');
          continue;
        }
        addUploadFile({
          id: uuid,
          fileName: file.name,
          fileSize: fileSizeInMB,
          progress: 0,
          status: i === 0 ? 'uploading' : 'waiting',//默认从第一个文件开始上传
        })
        addFileCount(1);//增加传输列表中的文件数
        uploadQueue.push({
          file,
          uuid: uuid,
        });
      }
      for (let i = 0; i < fileArr.length; i++) {
        const {file, uuid} = uploadQueue[i];//取出每一个文件

        const processFile = async (file: File, uuid: string) => {
          try {

            await verifyPromise(file, uuid);

            console.log(`${file.name} processed successfully`);

            //传输列表文件数-1
            subtractFileCount();

            removeFile(file.name);

            changeState(uuid, 'completed');
            if (uploadQueue[i + 1]) {
              changeState(uploadQueue[i + 1].uuid, 'uploading');
            }
          } catch (error) {
            console.error(`Error processing ${file.name}:`, error);
            changeState(uuid, 'error');
          }
        };

        await processFile(file, uuid);
      }
    }
  }
  return (
      <ConfigProvider
          theme={{
            components: {
              Button: {
                contentFontSizeSM: 12,
              },
            },
          }}
      >
        <div className={style.action}>
          <Button type="primary" shape="round" className={style.button} onClick={() => {
            inputRef.current!.click();
          }}>
            上传文件
            <input type="file" style={{display: 'none'}} ref={inputRef} onChange={upload}/>
          </Button>
          <Button type="default" shape="round" className={style.button}>
            新建文件夹
          </Button>
        </div>
      </ConfigProvider>
  );
}

export default ActionArea;

