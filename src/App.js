import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Header from "./compoments/Header/Header";

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
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
