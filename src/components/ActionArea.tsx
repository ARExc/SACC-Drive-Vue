import style from "./styles/ActionArea.module.scss";
import {Button} from "antd";

const ActionArea = () => {
  return (
    <div className={style.action}>
      <Button type="primary" shape="round" >
        上传文件
      </Button>
      <Button type="default" shape="round">
        新建文件夹
      </Button>
    </div>
  );
}
export default ActionArea;
