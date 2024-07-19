export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}

export interface RegisterData {
  username: string;
  nickname: string;
  password: string;
}
