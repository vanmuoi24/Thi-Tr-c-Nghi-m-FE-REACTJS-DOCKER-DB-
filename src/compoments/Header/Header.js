import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logOut } from "../Service/LoginService";
import { toast } from "react-toastify";
import { ResetStateLogOut } from "../../Redux/Action/userAction";
import Language from "../../Language/Language";
import Profile from "./Profile/Profile";
import { useState } from "react";

function Header() {
  const account = useSelector((state) => state.user.account);
  const [show, setShow] = useState(false);
  let dispath = useDispatch();

  const isAuthenticated = useSelector(
    (state) => state.user.account.isAuthenticated
  );
  let navi = useNavigate();

  const handleLogin = () => {
    navi("/login");
  };

  const hanleLogOut = async (email, token) => {
    let res = await logOut(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      navi("/login");
      dispath(ResetStateLogOut({}));
    }
  };
  const handleProfile = () => {
    setShow(true);
  };
  return (
    <>
      {" "}
      <Navbar expand="lg" className="bg-body-tertiary navbar">
        <Container>
          <Navbar.Brand href="/">Ngân Hàng Câu Hỏi</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className=" nav-link ">
                Home
              </Link>
              {account.role === "ADMIN" ? (
                <>
                  <Link to="/admins" className=" nav-link ">
                    Admin
                  </Link>
                </>
              ) : (
                <Link to="/users" className=" nav-link ">
                  Users{" "}
                </Link>
              )}
            </Nav>

            <Nav>
              {isAuthenticated === false ? (
                <>
                  {" "}
                  <button className="btn-dnhap" onClick={() => handleLogin()}>
                    Login
                  </button>
                  <button className="btn-dangki">Sign</button>
                </>
              ) : (
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => handleProfile()}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => hanleLogOut()}>
                    LogOut
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <Language />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Profile show={show} setShow={setShow} />
    </>
  );
}

export default Header;
