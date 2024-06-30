import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Header() {
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector(
    (state) => state.user.account.isAuthenticated
  );
  let navi = useNavigate();

  const handleLogin = () => {
    navi("/login");
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
              <Link to="/users" className=" nav-link ">
                Users{" "}
              </Link>
              <Link to="/admins" className=" nav-link ">
                Admin
              </Link>
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
                  <NavDropdown.Item>LogOut</NavDropdown.Item>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
