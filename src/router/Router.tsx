import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Login from "@/pages/Login.tsx";
import Register from "@/pages/Register.tsx";
import Reset from "@/pages/Reset.tsx";
import AuthProvider from "@/components/AuthProvider.tsx";
import Home from "@/pages/Home.tsx";
import {useAuthStore} from "@/store/authStore.ts";

const Router = () => {

  const isLogged = useAuthStore((state) => state.isLogged);

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/login" replace={true}/>,
    },
    {
      path: '/login',
      element: isLogged ? <Navigate to="/home" replace={true}/> : <Login/>,
    },
    {
      path: '/home',
      element: <AuthProvider/>,
      children: [
        {
          path: '',
          element: <Home/>,
        }
      ]
    },
    {
      path: '/register',
      element: <Register/>
    },
    {
      path: '/reset',
      element: <Reset/>
    }]
  );
  return <RouterProvider router={routes}/>
}

export default Router;
