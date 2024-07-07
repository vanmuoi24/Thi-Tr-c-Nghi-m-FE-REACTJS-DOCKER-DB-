import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import { deleteQuiz } from "../../../Service/Quiz";
import { toast } from "react-toastify";
const ModalDeleteQuiz = (props) => {
  const { showDelete, setShowDelete, idItem } = props;
  const handleClose1 = () => setShowDelete(false);
  const handleDeleteQuiz = async () => {
    let res = await deleteQuiz(idItem);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      props.fetchdata();
      handleClose1();
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <Modal show={showDelete} onHide={handleClose1} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this quiz have{" "}
          <strong>{idItem ? idItem : ""} </strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteQuiz}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
