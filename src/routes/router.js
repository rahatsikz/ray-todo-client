import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import TodoMain from "../Pages/TodoMain/TodoMain";
import Dashboard from "../Layout/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/todos",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/todos",
        element: (
          <PrivateRoute>
            <TodoMain></TodoMain>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
