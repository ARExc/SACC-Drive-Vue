import {useAuthStore} from "@/store/authStore.ts";
import {Navigate, Outlet} from "react-router-dom";
import {useEffect} from "react";

const AuthProvider = () => {
  const {isLogged, checkToken} = useAuthStore();
  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return isLogged ? <Outlet/> : <Navigate to="/login" replace/>;
}
export default AuthProvider;
