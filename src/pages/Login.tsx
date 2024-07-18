import style from './styles/Login.module.scss';
import React, {useState} from "react";
import {login} from "@/api/login.ts";
import {useNavigate} from "react-router-dom";
import {message} from "antd";

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "") {
      messageApi.open({
        type: 'error',
        content: '请输入账号',
      }).then();
      return;
    } else if (password === "") {
      messageApi.open({
        type: 'error',
        content: '请输入密码',
      }).then();
      return;
    }
    login({username, password}).then(res => {
      localStorage.setItem('token', res.data.data.token);
      navigate('/home');
    }).catch(err => {
      console.log(err);
      navigate('/home');
    });
  }
  const handleRegister = () => {
    navigate('/register');
  }
  const handleReset = () => {
    navigate('/reset');
  }

  return (
    <div className={style.login}>
      {contextHolder}
      <img className={style.img} src="/src/assets/sacc.png" alt=""/>
      <h2 className={style.h2}>SACC网盘系统</h2>
      <h3 className={style.h3}>SACC NETWORK DISK SYSTEM</h3>
      <div className={style.form}>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="输入账号" id={style.studentId} onChange={e => {
              setUsername(e.target.value);
            }}/>
          </div>
          <div>
            <input type="password" placeholder="输入密码" id={style.password} onChange={e => {
              setPassword(e.target.value);
            }}/>
          </div>
          <button className={style.button} type="submit">登录</button>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <p className={style.p} onClick={handleRegister}>注册</p>
            <p className={style.p} onClick={handleReset}>忘记密码</p>
          </div>
        </form>
      </div>
    </div>
  )

};
export default Login;
