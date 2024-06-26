import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from './pages/Home.jsx'
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DepartmentCrud from "./pages/DepartmentCrud.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/departments",
    element: <DepartmentCrud/>,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
