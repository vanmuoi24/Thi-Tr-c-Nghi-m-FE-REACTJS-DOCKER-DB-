import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Header from "./compoments/Header/Header";
import PerfectScrollbar from "react-perfect-scrollbar";
import "./index.scss";
function App() {
  return (
    <>
      <div className="app-contrainer">
        <div className="header-container">
          <Header />
        </div>
        <div className="main-container ">
          <div className="sidenav-container"></div>
          <div className="app-content">
            <PerfectScrollbar>
              {" "}
              <Outlet />
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
