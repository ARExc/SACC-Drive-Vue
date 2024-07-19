import {create} from "zustand";

interface AuthState {
  isLogged: boolean;
  login: (token: string) => void;
  logout: () => void;
  token: string | null;
  checkToken: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isLogged: false,
  token: null,
  login: (token: string) => {
    localStorage.setItem('token', token);
    set({isLogged: true, token});
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    console.log('logout')
    set({isLogged: false, token: null});
  },
  checkToken: () => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      // TODO: 请求后端验证 token
      set({isLogged: true, token});
    } else {
      set({isLogged: false, token: null});
    }
  },
}));
