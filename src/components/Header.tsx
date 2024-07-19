import React, {useState} from "react";
import style from "./styles/Header.module.scss";
import imagePath from "../assets/sacc.png";
import {EditOutlined, RollbackOutlined} from "@ant-design/icons";
import TransmissionList from "@/components/TransmissionList.tsx";
import {Popover} from "antd";
import useUploadStore from "@/store/uploadStore.ts";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "@/store/authStore.ts";

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {fileCount} = useUploadStore();
  const navigate = useNavigate();
  const {logout} = useAuthStore();
  const handleReset = () => {
    navigate('/reset');
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
      <header className={style.header}>
        <Popover placement="bottomLeft" trigger="click" content={(<TransmissionList/>)} style={{padding: '0'}}>
          <div className={style.transmit}>
            <div className={style.badgeContainer}>
              {fileCount > 0 && <span className={style.count}>{fileCount}</span>}
            </div>
            <img src="src/assets/swap.svg" alt="" className={style.icon}/>
          </div>
        </Popover>
        <div className={style.round}
             onMouseEnter={() => setIsVisible(true)}
            // onMouseLeave={() => setIsVisible(false)}
        >
          <img src={imagePath} alt="user avatar"/>
        </div>
        <div className={style.hoverBar}
             onMouseEnter={() => setIsVisible(true)}
             onMouseLeave={() => setIsVisible(false)}
        >
          用户名：{localStorage.getItem('username')}
          <ul className={`${style.menu} ${isVisible ? style.visible : ''}`}>
            {/*当isVisible为true的时候，应用menu和visible两个样式*/}
            <div className={style.item} onClick={handleReset}>
              <EditOutlined/>
              修改密码
            </div>
            <div className={style.item} onClick={handleLogout}>
              <RollbackOutlined/>
              退出登录
            </div>
          </ul>
        </div>
      </header>
  )
}

export default Header;
