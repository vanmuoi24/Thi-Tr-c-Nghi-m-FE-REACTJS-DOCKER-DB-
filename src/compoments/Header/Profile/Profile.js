import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UserInformaiton from "./UserInformaiton";
import ChangePassword from "./ChangePassword";
import HistryQuiz from "./HistryQuiz";
import { useSelector } from "react-redux";

function Profile(props) {
  const { show, setShow } = props;
  const handleClose = () => setShow(false);
  const account = useSelector((state) => state.user.account);
  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title> User Information Management</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="User Informaiton">
              <UserInformaiton account={account} />
            </Tab>
            <Tab eventKey="password" title="Change Password">
              <ChangePassword />
            </Tab>
            <Tab eventKey="history" title="History">
              <HistryQuiz></HistryQuiz>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Profile;
