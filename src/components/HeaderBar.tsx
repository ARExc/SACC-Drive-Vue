import {Breadcrumb} from "antd";
import style from "./styles/HeaderBar.module.scss";
import ActionArea from "./ActionArea.tsx";

const HeaderBar = () => {
  return (
    <div className={style.head}>
      <ActionArea></ActionArea>
      <Breadcrumb></Breadcrumb>
    </div>
  );
}
export default HeaderBar;
