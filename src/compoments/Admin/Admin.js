import Sibar from "./Sibar";
import "./Admin.scss";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
const Admin = () => {
  return (
    <div className="admin-container">
      <div className="sideber-container">
        {" "}
        <Sibar />
      </div>

      <div className="admin-content">
        <PerfectScrollbar>
          {" "}
          <Outlet />
        </PerfectScrollbar>
      </div>
    </div>
  );
};

export default Admin;
