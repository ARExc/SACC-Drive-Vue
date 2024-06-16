import React from "react";
import style from "./styles/Header.module.scss";
import imagePath from "../assets/sacc.png";

const Header: React.FC = () => {
  return (
    <div className={style.header}>
      <div className={style.round}>
        <img src={imagePath} alt="user avatar"/>
      </div>
      <div className={style.hoverBar}>
        username
        <ul className="menu">
          <div>
            修改密码
          </div>
          <div className="item">
            退出登录
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Header;
