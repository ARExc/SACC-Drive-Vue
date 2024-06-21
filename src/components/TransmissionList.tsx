import style from "./styles/TransmissionList.module.scss";
import {Progress} from "antd";
import useUploadStore from "@/store/uploadStore.ts";


const TransmissionList = () => {
  const {uploadFiles} = useUploadStore();

  const switchOperation = (status: string) => {
    switch (status) {
      case 'uploading':
        return (
          <div>
            <button>暂停</button>
            <button>取消</button>
          </div>
        );
      case 'paused':
        return (
          <div>
            <button>继续</button>
            <button>取消</button>
          </div>
        );
      case 'waiting':
        return (
          <div>
            <button>开始</button>
            <button>取消</button>
          </div>
        );
      case 'completed':
        return (
          <div>
            <button>删除</button>
          </div>
        );
      case 'error':
        return (
          <div>
            <button>重试</button>
            <button>取消</button>
          </div>
        );
      case 'canceled':
        return (
          <div>
            <button>删除</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={style.container}>
      <section className={style.left}>
        <div>
          上传列表
        </div>
        <div>
          下载列表
        </div>
      </section>
      <section className={style.middle}></section>
      <section className={style.right}>
        <section>正在上传</section>
        <section className={style.boundary}></section>
        <section>{
          uploadFiles.map((item, index) => {
            return (
              <div className={style.frame} key={index}>
                <div className={style.display}>
                  <img src="src/assets/icon/file.png" alt="a file icon" className={style.icon}></img>
                  <div className={style.info}>
                    <div className={style.name}>{item.fileName}</div>
                    <Progress percent={30} size="small"/>
                    <div className={style.size}>{item.fileSize}MB</div>
                  </div>

                </div>
                <div className={style.operate}>{
                  switchOperation(item.status)
                }</div>
                <div className={style.boundary}></div>
              </div>
            )
          })}</section>
      </section>
    </div>
  )
}
export default TransmissionList;
