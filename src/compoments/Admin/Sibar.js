import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, NavLink } from "react-router-dom";

const Sibar = () => {
  const hanleToglebtn = () => {
    document.querySelector("#sidebar").classList.toggle("expand");
  };
  return (
    <>
      <div className="wrapper">
        <aside id="sidebar">
          <div className="d-flex">
            <button className="toggle-btn" onClick={hanleToglebtn}>
              <i className="lni lni-grid-alt"></i>
            </button>
            <div className="sidebar-logo">
              <span>Admin</span>
            </div>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-item">
              <Link to="/admins" className="sidebar-link">
                <i class="fa-solid fa-house"></i>
                <span>DashBoard</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="manage-user" className="sidebar-link">
                <i className="lni lni-user"></i>
                <span>Maneger Users</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="manage-quiz" className="sidebar-link">
                <i className="lni lni-agenda"></i>
                <span>Maneger Quiz</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="manage-question" className="sidebar-link">
                <i className="lni lni-protection"></i>
                <span>Maneger Qustion</span>
              </Link>
            </li>

            <li className="sidebar-item">
              {" "}
              <Link to="/" className="sidebar-link">
                <i className="lni lni-exit"></i>
                <span> Back Home</span>
              </Link>
            </li>
          </ul>
          <div className="sidebar-footer"></div>
        </aside>
      </div>
    </>
  );
};

export default Sibar;
