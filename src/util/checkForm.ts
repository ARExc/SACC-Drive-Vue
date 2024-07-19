export const checkForm = (username: string, password: string): { state: string, message: string } => {
  if (username === "") {
    return {state: 'error', message: '请输入账号'};
  } else if (password === "") {
    return {state: 'error', message: '请输入密码'};
  }
  return {state: 'success', message: ''};
}

