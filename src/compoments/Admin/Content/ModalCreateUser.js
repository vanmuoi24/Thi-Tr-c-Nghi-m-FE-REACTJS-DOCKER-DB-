import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import "./Modal.scss";
import { toast } from "react-toastify";
import { postCretaeNewUser } from "../../Service/ApiService";
const ModalCreateUser = (props) => {
  const { show, setShow } = props;
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("User");

  const [image, setImage] = useState(null);
  const [images, setImages] = useState(null);
  function isValidEmail(email) {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEmail.test(email);
  }
  const handleClose = () => {
    setShow(false);
    setImages("");
    setemail("");
    setpassword("");
    setrole("USER");
    setusername("");
  };
  const handlesaveModel = async () => {
    const checkemail = isValidEmail(email);
    if (!checkemail) {
      toast.error("Invalid email");
      return;
    }
    if (!password) {
      toast.error("Password can not be blank");
      return;
    }

    let res = await postCretaeNewUser(email, password, username, role, images);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      await props.fetchdata();
    }
    if (res && res.EC != 0) {
      toast.error(res.EM);
    }
  };

  const handleImageChange = (e) => {
    if (e.target && e.target.value && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setImages(e.target.files[0]);
    } else {
      //   setImage(null);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(event) => setemail(event.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setpassword(event.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridUserName">
                <Form.Label>UserName</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(event) => setusername(event.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridRole">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  onChange={(event) => setrole(event.target.value)}
                  value={role}
                >
                  <option>User</option>
                  <option>Admin</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="col-3 mb-3">
              <Form.Group controlId="formGridImage">
                <label className="btn " htmlFor="lableUp">
                  {" "}
                  <i className="lni lni-circle-plus"></i>
                  <span>Upload file</span>
                </label>

                <div className="custom-file">
                  <Form.Control
                    id="lableUp"
                    type="file"
                    className="custom-file-input"
                    onChange={handleImageChange}
                    hidden
                  />
                </div>
              </Form.Group>
            </Row>
            {image && (
              <Row className="col-3 mb-3">
                <Image src={image} thumbnail />
              </Row>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handlesaveModel()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
