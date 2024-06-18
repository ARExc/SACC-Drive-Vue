import React, {useState} from "react";
import style from "./styles/Header.module.scss";
import imagePath from "../assets/sacc.png";
import {EditOutlined, RollbackOutlined} from "@ant-design/icons";

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <header className={style.header}>
      <div className={style.round}
           onMouseEnter={() => setIsVisible(true)}
           onMouseLeave={() => setIsVisible(false)}
      >
        <img src={imagePath} alt="user avatar"/>
      </div>
      <div className={style.hoverBar}
           onMouseEnter={() => setIsVisible(true)}
           onMouseLeave={() => setIsVisible(false)}
      >
        username
        <ul className={`${style.menu} ${isVisible ? style.visible : ''}`}>
          {/*当isVisible为true的时候，应用menu和visible两个样式*/}
          <div className={style.item}>
            <EditOutlined/>
            修改密码
          </div>
          <div className={style.item}>
            <RollbackOutlined/>
            退出登录
          </div>
        </ul>
      </div>
    </header>
  )
}

export default Header;
