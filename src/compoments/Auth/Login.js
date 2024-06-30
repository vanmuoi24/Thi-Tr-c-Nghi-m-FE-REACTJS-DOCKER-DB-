import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../Service/LoginService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../../Redux/Action/userAction";
import "./Login.scss";
import { set } from "lodash";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isloading, setisloading] = useState(false);
  let dataUser = useSelector((state) => state.user);
  let dispath = useDispatch();
  let navi = useNavigate();
  const handleLogin = async () => {
    setisloading(true);
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      setisloading(false);
      dispath(
        UserLogin({
          data,
        })
      );
      setTimeout(() => {
        navi("/");
      }, 1000);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <div className="login-container">
      <div className="header col-4 mx-auto text-center">TypeForm</div>
      <div className="title col-4 mx-auto text-center">
        <span>Helle,who's this?</span>
      </div>
      <div className="welcome col-4 mx-auto"></div>
      <div className="login-content col-4 mx-auto">
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(event) => setemail(event.target.value)}
          />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(event) => setpassword(event.target.value)}
          />
        </div>
        <Link to="forgot">forgot password?</Link>
        <div className="mt-4">
          <button
            className="btn btn-primary col-12  btn1"
            onClick={() => handleLogin()}
            disabled={isloading}
          >
            {isloading === true && <i className="lni lni-spinner-solid "></i>}{" "}
            <span>Login</span>
          </button>
        </div>

        <div className="back-hone">
          <Link to="/" className=" nav-link text-center mt-2">
            {" "}
            &#60; &#60; go to home{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
