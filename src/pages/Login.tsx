import style from './styles/Login.module.scss';
import React, {useState} from "react";
import {login} from "@/api/login.ts";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({username, password}).then(res => {
      localStorage.setItem('token', res.data.data.token);
      navigate('/home');
    }).catch(err => {
      console.log(err);
      navigate('/home');
    });
  }

  return (
    <div className={style.login}>
      <img src="/src/assets/sacc.png" alt=""/>
      <h2>SACC网盘系统</h2>
      <h3>SACC NETWORK DISK SYSTEM</h3>
      <div className={style.form}>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="输入账号" onBlur={e => {
              setUsername(e.target.value);
            }}/>
          </div>
          <div>
            <input type="password" placeholder="输入密码" onBlur={e => {
              setPassword(e.target.value);
            }}/>
          </div>
          <button type="submit">登录</button>
        </form>
      </div>
    </div>
  )

};
export default Login;
