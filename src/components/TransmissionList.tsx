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
  const {uploadFiles, changeState, startNextFile, removeFile} = useUploadStore();

  const handleContinue = (id: string) => {
    console.log('继续/开始上传')
    changeState(id, 'uploading');
  }
  //暂停，可以继续上传，也可以取消
  //不会自动的上传下一个文件，需要手动点击继续
  const handlePause = (id: string) => {
    console.log('暂停')
    changeState(id, 'paused');
  }

  //取消，不能继续上传，只能重新上传，或者删除
  const handleCancel = (id: string) => {
    console.log('取消')
    changeState(id, 'canceled');
    startNextFile();
  }
  //删除，删除传输列表中的条目，不可恢复
  const handleDel = (id: string) => {
    console.log('删除')
    removeFile(id);
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
              <Button shape="circle" icon={<ClockCircleOutlined/>} name="等待中" onClick={()=>handleContinue(id)}/>
              <Button shape="circle" icon={<CloseOutlined/>} name="取消" onClick={() => handleCancel(id)}/>
            </div>
        );
      case 'completed':
        return (
            <div>
              <Button shape="circle" icon={<DeleteOutlined/>} name="删除条目" onClick={() => handleDel(id)}/>
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
            <Progress percent={progress} size="small"/>
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
