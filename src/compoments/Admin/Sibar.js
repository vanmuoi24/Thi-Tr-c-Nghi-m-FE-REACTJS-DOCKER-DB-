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
              <a>Admin</a>
            </div>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-item">
              <Link to="manage-user" className="sidebar-link">
                <i className="lni lni-user"></i>
                <span>Quản Lí Users</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link">
                <i className="lni lni-agenda"></i>
                <span>Quản Lí Bài Quiz</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a
                className="sidebar-link collapsed has-dropdown"
                data-bs-toggle="collapse"
                data-bs-target="#auth"
                aria-expanded="false"
                aria-controls="auth"
              >
                <i className="lni lni-protection"></i>
                <span>Quản Lí Câu Hỏi</span>
              </a>
              <ul
                id="auth"
                className="sidebar-dropdown list-unstyled collapse"
                data-bs-parent="#sidebar"
              >
                <li className="sidebar-item">
                  <a className="sidebar-link">Login</a>
                </li>
                <li className="sidebar-item">
                  <a className="sidebar-link">Register</a>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a
                className="sidebar-link collapsed has-dropdown"
                data-bs-toggle="collapse"
                data-bs-target="#multi"
                aria-expanded="false"
                aria-controls="multi"
              >
                <i className="lni lni-layout"></i>
                <span>Multi Level</span>
              </a>
              <ul
                id="multi"
                className="sidebar-dropdown list-unstyled collapse"
                data-bs-parent="#sidebar"
              >
                <li className="sidebar-item">
                  <a
                    className="sidebar-link collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#multi-two"
                    aria-expanded="false"
                    aria-controls="multi-two"
                  >
                    Two Links
                  </a>
                  <ul
                    id="multi-two"
                    className="sidebar-dropdown list-unstyled collapse"
                  >
                    <li className="sidebar-item">
                      <a className="sidebar-link">Link 1</a>
                    </li>
                    <li className="sidebar-item">
                      <a className="sidebar-link">Link 2</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link">
                <i className="lni lni-popup"></i>
                <span>Notification</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link">
                <i className="lni lni-cog"></i>
                <span>Setting</span>
              </a>
            </li>
          </ul>
          <div className="sidebar-footer">
            <a className="sidebar-link">
              <i className="lni lni-exit"></i>
              <span>Logout</span>
            </a>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sibar;
