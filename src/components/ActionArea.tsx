import style from "./styles/ActionArea.module.scss";
import {Button, ConfigProvider} from "antd";
import React, {useRef} from "react";
import useFileStore from "@/store/fileStore.ts";
import md5Promise from "@/util/md5Promise.ts";
import uploadPromise from "@/util/uploadPromise.ts";
import {v4 as uuidv4} from 'uuid';
import useUploadStore from "@/store/uploadStore.ts";

const ActionArea = () => {

  const inputRef = useRef<HTMLInputElement>(null);
  const {fileMd5} = useFileStore();
  const {addUploadFile, addFileCount, subtractFileCount, removeFile} = useUploadStore();
  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;//获取用户选择的所有文件，此处是引用传递，需要复制一份
    if (files !== null) {
      const fileArr = Array.from(files);
      e.target.value = '';// 重置input，允许重新上传相同文件

      //用于在传输列表中显示文件名，文件大小，上传进度等信息，一次性显示所有文件，只是状态不同
      for (let i = 0; i < fileArr.length; i++) {
        const file = fileArr[i];
        const fileId = uuidv4();
        const fileSizeInMB = +(file.size / 1024 / 1024).toFixed(2) !== 0 ? +(file.size / 1024 / 1024).toFixed(2) : 0.01;
        if (fileSizeInMB > 5120) {
          alert('文件大小不能超过5GB，' + file.name + '上传失败');
          continue;
        }
        addUploadFile({
          id: fileId,
          fileName: file.name,
          fileSize: fileSizeInMB,
          progress: 0,
          status: i === 0 ? 'uploading' : 'waiting',
        })
        addFileCount(1);//增加传输列表中的文件数
      }
      for (const file of fileArr) {

        const processFile = async (file: File) => {
          try {
            await Promise.all([md5Promise(file), uploadPromise(file, fileMd5)]);
            console.log(`${file.name} processed successfully`);
          } catch (error) {
            console.error(`Error processing ${file.name}:`, error);
          }
        };
        //计算文件MD5
        md5Promise(file).then(() => {
          console.log("文件MD5计算成功");
        }).catch(err => {
          console.log('md5值计算失败' + err.message)
          setTimeout(() => {
            // window.location.reload();
          }, 500);
        });

        uploadPromise(file, fileMd5).then(() => {
          console.log("文件上传成功");
          subtractFileCount();
          removeFile(file.name);//上传成功后删除传输列表中的文件，如果有重名的，自动重命名
        }).catch(err => {
          console.log('文件上传失败' + err.message)
          setTimeout(() => {
            // window.location.reload();
          }, 500);
        });

        await processFile(file);


        setTimeout(() => {
        }, 10000);
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
          <input type="file" multiple style={{display: 'none'}} ref={inputRef} onChange={upload}/>
        </Button>
        <Button type="default" shape="round" className={style.button}>
          新建文件夹
        </Button>
      </div>
    </ConfigProvider>
  );
}

export default ActionArea;

