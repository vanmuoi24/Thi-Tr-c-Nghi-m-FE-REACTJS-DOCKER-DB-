import App from "./App";
import "./index.scss";
import User from "./compoments/Users/User";
import Admin from "./compoments/Admin/Admin";
import Header from "./compoments/Header/Header";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
import Home from "./compoments/Home/Home";
import DashBoard from "./compoments/Admin/Content/DashBoard";
import ManageUser from "./compoments/Admin/Content/ManageUser";
import Login from "./compoments/Auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DetailQuiz from "./compoments/Users/DetailQuiz";
import ManagerQuiz from "./compoments/Admin/Content/Quiz/ManagerQuiz";
import ManageQuestion from "./compoments/Admin/Content/Question/ManageQuestion";
import PrivateRouter from "./Routers/PrivateRouter";

const RouterApp = () => {
  return (
    <>
      {" "}
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />}></Route>
          <Route
            path="users"
            element={
              <PrivateRouter>
                <User />
              </PrivateRouter>
            }
          ></Route>
        </Route>
        <Route path="quiz/:id" element={<DetailQuiz />}></Route>
        <Route
          path="admins"
          element={
            <PrivateRouter>
              <Admin />
            </PrivateRouter>
          }
        >
          <Route index element={<DashBoard />}></Route>
          <Route path="manage-user" element={<ManageUser />}></Route>
          <Route path="manage-quiz" element={<ManagerQuiz />}></Route>
          <Route path="manage-question" element={<ManageQuestion />}></Route>
        </Route>

        <Route path="login" element={<Login />}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default RouterApp;
