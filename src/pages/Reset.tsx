import style from './styles/User.module.scss';
import React, {useState} from "react";
import {message} from "antd";
import {checkForm} from "@/util/checkForm.ts";

const Reset = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = checkForm(username, password);
    if (result.state === 'error') {
      messageApi.open({
        type: 'error',
        content: result.message,
      }).then();
      return;
    } else {
      messageApi.open({
        type: 'success',
        content: '注册成功',
      }).then();
    }
    //TODO: reset password
  }
  const handleBack = () => {
    history.back()
  }

  return (
      <div className={style.container}>
        {contextHolder}
        <img className={style.img} src="/src/assets/sacc.png" alt=""/>
        <h2 className={style.h2}>SACC网盘系统</h2>
        <h3 className={style.h3}>SACC NETWORK DISK SYSTEM</h3>
        <div className={style.form}>
          <form onSubmit={handleSubmit}>
            <div>
              <input type="text" placeholder="输入学号" className={style.input} onChange={e => {
                setUsername(e.target.value);
              }}/>
            </div>
            <div>
              <input type="password" placeholder="输入新密码" className={style.input} onChange={e => {
                setPassword(e.target.value);
              }}/>
            </div>
            <div>

            </div>
            <button className={style.button} type="submit">修改密码</button>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <p className={style.back} onClick={handleBack}>返回</p>
            </div>
          </form>
        </div>
      </div>
  )

};
export default Reset;
