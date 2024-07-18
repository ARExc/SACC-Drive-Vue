import style from "./styles/TransmissionList.module.scss";
import {Button, Progress} from "antd";
import useUploadStore from "@/store/uploadStore.ts";
import {
  ArrowUpOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  PauseOutlined,
  UndoOutlined
} from "@ant-design/icons";

const TransmissionList = () => {
  const {uploadFiles, changeState,startNextFile} = useUploadStore();

  const handlePause = (id: string) => {
    changeState(id, 'paused');
    startNextFile();
  }

  const handleCancel = (id: string) => {
    changeState(id, 'canceled');
    startNextFile();
  }
  const handleContinue = (id: string) => {
    changeState(id, 'uploading');
  }


  const switchOperation = (status: string, id: string) => {
    switch (status) {
      case 'uploading':
        return (
            <div>
              <Button shape="circle" icon={<PauseOutlined/>} name="暂停" onClick={() => handlePause(id)}/>
              <Button shape="circle" icon={<CloseOutlined/>} name="取消" onClick={() => handleCancel(id)}/>
            </div>
        );
      case 'paused':
        return (
            <div>
              <Button shape="circle" icon={<ArrowUpOutlined/>} name="继续" onClick={() => handleContinue(id)}/>
              <Button shape="circle" icon={<CloseOutlined/>} name="取消" onClick={() => handleCancel(id)}/>
            </div>
        );
      case 'waiting':
        return (
            <div>
              <Button shape="circle" icon={<ClockCircleOutlined/>} name="等待中"/>
              <Button shape="circle" icon={<CloseOutlined/>} name="取消" onClick={() => handleCancel(id)}/>
            </div>
        );
      case 'completed':
        return (
            <div>
              <Button shape="circle" icon={<DeleteOutlined/>} name="删除条目"/>
            </div>
        );
      case 'error':
        return (
            <div>
              <Button shape="circle" icon={<UndoOutlined/>} name="重新上传"/>
              <Button shape="circle" icon={<CloseOutlined/>} name="取消" onClick={() => handleCancel(id)}/>
            </div>
        );
      case 'canceled':
        return (
            <div>
              <Button shape="circle" icon={<DeleteOutlined/>} name="删除条目"/>
            </div>
        );
      default:
        return null;
    }
  };

  const switchState = (status: string, progress: number) => {
    switch (status) {
      case 'uploading':
        return (
            <Progress percent={progress} size="small"/>
        )
      case 'completed':
        return (
            <div>已完成</div>
        )
      case 'canceled':
        return (
            <div>已取消</div>
        )
      case 'paused':
        return (
            <div>暂停中</div>
        )
      case 'waiting':
        return (
            <div>等待中</div>
        )
    }
  }

  return (
      <div className={style.container}>
        <section className={style.left}>
          <div className={style.text}>
            上传列表
          </div>
          <div className={style.text}>
            下载列表
          </div>
        </section>
        <section className={style.middle}></section>

        <section className={style.right}>

          <div className={style.title}>正在上传</div>
          <section className={style.boundary}></section>
          <section>{
            uploadFiles.map((item, index) => {
              return (
                  <div className={style.frame} key={index}>
                    <div className={style.display}>
                      <img src="src/assets/icon/file.png" alt="a file icon" className={style.icon}></img>
                      <div className={style.info}>
                        <div className={style.name}>{item.fileName}</div>
                        <div className={style.state}>
                          {switchState(item.status, item.progress)}
                        </div>
                        <div className={style.size}>{item.fileSize}MB</div>
                      </div>
                      <div className={style.operate}>{
                        switchOperation(item.status, item.id)
                      }</div>
                    </div>
                    {index === uploadFiles.length - 1 ? null : <div className={style.boundary}></div>}
                  </div>
              )
            })}</section>
        </section>
      </div>
  )
}
export default TransmissionList;
