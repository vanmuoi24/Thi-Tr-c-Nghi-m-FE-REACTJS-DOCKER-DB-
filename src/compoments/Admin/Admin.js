import Sibar from "./Sibar";
import "./Admin.scss";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="sideber-container">
        {" "}
        <Sibar />
      </div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
