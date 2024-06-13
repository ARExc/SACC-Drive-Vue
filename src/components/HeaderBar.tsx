import {Breadcrumb} from "antd";

import ActionArea from "./ActionArea.tsx";

const HeaderBar = () => {
  return (
    <div className="head">
      <ActionArea></ActionArea>
      <Breadcrumb ></Breadcrumb>
    </div>
  );
}
export default HeaderBar;
