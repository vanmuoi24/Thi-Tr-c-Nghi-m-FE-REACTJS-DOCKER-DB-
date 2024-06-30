import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import _ from "lodash";

const ModelResult = (props) => {
  const { show, setShow, dataModal } = props;
  const handleClose1 = () => setShow(false);
  return (
    <>
      <Modal show={show} onHide={handleClose1} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Your ReSult...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Total Question : {dataModal?.DT?.countTotal} </div>
          <div>Total Correct answer : {dataModal?.DT?.countCorrect} </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="danger" onClick={handleClose1}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModelResult;
