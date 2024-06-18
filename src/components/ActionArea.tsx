import style from "./styles/ActionArea.module.scss";
import {Button, ConfigProvider} from "antd";
import React, {useRef} from "react";

const ActionArea = () => {

  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];//获取上传文件列表的第一个元素
    e.target.value = '';// 重置input，允许重新上传相同文件
    if (file) {
      const fileSizeInMB = +(file.size / 1024 / 1024).toFixed(2) !== 0 ? +(file.size / 1024 / 1024).toFixed(2) : 0.01;
      if (fileSizeInMB > 5120) {
        alert('文件大小不能超过5GB');
        return;
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

