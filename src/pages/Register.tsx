import style from './styles/User.module.scss';
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {message} from "antd";
import {register} from "@/api/user/register.ts";
import {checkForm} from "@/util/checkForm.ts";

const Register = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

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
    register({username, nickname, password}).then(res => {
      if (res.status !== 200) {
        messageApi.open({
          type: 'error',
          content: '注册失败，请重试'
        }).then();
        return;
      }
      navigate('/login');
    }).catch(err => {
      console.log(err);
      navigate('/error');
    });
  }
  const handleBack = () => {
    navigate('/login');
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
              <input type="text" placeholder="输入昵称" className={style.input} onChange={e => {
                setNickname(e.target.value);
              }}/>
            </div>
            <div>
              <input type="password" placeholder="输入密码" className={style.input} onChange={e => {
                setPassword(e.target.value);
              }}/>
            </div>
            <button className={style.button} type="submit">注册</button>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <p className={style.back} onClick={handleBack}>返回登录界面</p>
            </div>
          </form>
        </div>
      </div>
  )

};
export default Register;
