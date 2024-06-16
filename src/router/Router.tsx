import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Login from "@/pages/Login.tsx";
import Home from "@/pages/Home.tsx";


const Router = () => {


  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/login" replace={true}/>,
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/home',
      element: <Home/>
    }]
  );
  return <RouterProvider router={routes}/>
}

export default Router;
