import style from './styles/User.module.scss';
import React, {useState} from "react";
import {login} from "@/api/user/login.ts";
import {useNavigate} from "react-router-dom";
import {message} from "antd";
import {useAuthStore} from "@/store/authStore.ts";
import {checkForm} from "@/util/checkForm.ts";

const Login = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setLogin = useAuthStore((state) => state.login);

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
    login({username, password}).then(res => {
      if (res.status !== 200) {
        messageApi.open({
          type: 'error',
          content: '登录失败，请检查账号密码是否正确'
        }).then();
        return;
      }
      const token = res.data.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      setLogin(token);
      navigate(`/home`);
    }).catch(err => {
      console.log(err);
      navigate('/login');
    });
  }
  const handleRegister = () => {
    navigate('/register');
  }
  const handleReset = () => {
    navigate('/reset');
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
              <input type="password" placeholder="输入密码" className={style.input} onChange={e => {
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
