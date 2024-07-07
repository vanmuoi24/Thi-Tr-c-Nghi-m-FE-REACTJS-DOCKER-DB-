import React, { useState } from "react";

import anh1 from "../../assets/Rectangle 6 (1).png";

import { useSelector } from "react-redux";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  let navi = useNavigate();
  const account = useSelector((state) => state.user.account);
  const handleStrat = () => {
    console.log(isAuthenticated);
    if (isAuthenticated == true) {
      navi("/users");
    }
  };
  return (
    <div className="homepage-container ">
      <div className="">
        <h3>Welcome to the multiple choice test application</h3>
        <p>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </p>
        <button className="btn btn-secondary" onClick={handleStrat}>
          Get Start{" "}
        </button>
      </div>

      <div className="">
        <img src={anh1}></img>
      </div>
    </div>
  );
};

export default Home;
