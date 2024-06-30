import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../Service/ApiService";
import { toast } from "react-toastify";
import _ from "lodash";

const ModalDelete = (props) => {
  const { showDelete, setShowDelete, dataItem } = props;
  const [email, setemail] = useState("");

  const handleClose1 = () => setShowDelete(false);
  useEffect(() => {
    if (!_.isEmpty(dataItem)) {
      setemail(dataItem.email);
    }
  }, [props.dataItem]);
  const handleDeleteUser = async () => {
    let res = await deleteUser(dataItem.id);

    if (res && res.EC === 0) {
      toast.success(res.EM);

      await props.fetchdata();
      handleClose1();
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <Modal show={showDelete} onHide={handleClose1} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user have email{" "}
          <strong> {email ? email : ""}</strong> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;
