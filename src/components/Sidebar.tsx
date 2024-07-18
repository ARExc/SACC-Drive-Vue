import React from 'react';
import {MailOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import style from './styles/Sidebar.module.scss';
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'sub1',
    label: '私有仓库',
    icon: <MailOutlined/>,
  },
  {
    key: 'sub2',
    label: '共享仓库',
    icon: <MailOutlined/>,
  },
  {
    key: 'sub3',
    label: '回收站',
    icon: <MailOutlined/>,
  },
  {
    key: 'sub4',
    label: '设置',
    icon: <MailOutlined/>,
  },
];

const Sidebar: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };
  return (
    <div className={style.side}>
      <div className={style.sign}>
        <div className={style.round}>
          <img src="/src/assets/sacc.png" alt="sacc图标"/>
        </div>
        <div>
          <span className={style.title}>SACC<br/>在线网盘系统</span>
        </div>
      </div>
      <Menu
        onClick={onClick}
        style={{width: 200, height: '100vh'}}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default Sidebar;
