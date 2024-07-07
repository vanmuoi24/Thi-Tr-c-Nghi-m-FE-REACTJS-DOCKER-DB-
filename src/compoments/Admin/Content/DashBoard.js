import { NavDropdown } from "react-bootstrap";
import Language from "../../../Language/Language";
import "./DashBoard.scss";
import TotalQuiz from "./TotalQuiz";
import { useEffect, useState } from "react";
import { getTotalDashBoard } from "../../Service/ApiService";
import { set } from "nprogress";
import Profile from "../../Header/Profile/Profile";
import { logOut } from "../../Service/LoginService";
import { ResetStateLogOut } from "../../../Redux/Action/userAction";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [dataView, setDataView] = useState();
  const [show, setShow] = useState(false);
  const account = useSelector((state) => state.user.account);
  let navi = useNavigate();
  let dispath = useDispatch();
  useEffect(() => {
    fetchDataOverView();
  }, []);
  const fetchDataOverView = async () => {
    let res = await getTotalDashBoard();
    if (res && res.EC === 0) {
      setDataView(res.DT);
    }
  };
  const handleProfile = () => {
    setShow(true);
  };

  const hanleLogOut = async (email, token) => {
    let res = await logOut(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      navi("/login");
      dispath(ResetStateLogOut({}));
    }
  };
  return (
    <div>
      <div className="header-admin">
        <div className="seach_input">
          <div className="header-icon">
            <i class="fa-brands fa-react fa-spin fa-xl"></i>
          </div>
          <div class="input-group col-6">
            <input
              type="text"
              class="form-control col-6"
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="Search">
                Search
              </button>
            </div>
          </div>{" "}
        </div>
        <div className="setting_language">
          {" "}
          <NavDropdown title="Setting" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => handleProfile()}>
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => hanleLogOut()}>
              LogOut
            </NavDropdown.Item>
          </NavDropdown>
          <Language />
        </div>
      </div>
      <hr></hr>
      <div className="title">
        <h3>AnaLyTics Dashboard</h3>
      </div>
      <TotalQuiz dataView={dataView} />
      <Profile show={show} setShow={setShow} />
    </div>
  );
};

export default DashBoard;
