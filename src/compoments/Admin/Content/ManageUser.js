import { useEffect, useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import TableUser from "./TableUser";
import { getAllUser, getPageListUser } from "../../Service/ApiService";
import ModalUpdateUser from "./ModalUPdateUser";

import ModalDelete from "./ModalDelete";

const ManageUser = () => {
  const [show, setShow] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [showupdate, setShowupdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const [usersPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  useEffect(() => {
    fetchdata(currentPage, usersPerPage);
  }, [currentPage]);
  const fetchdata = async () => {
    let res = await getPageListUser(currentPage, usersPerPage);
    if (res && res.EC === 0) {
      setDataUser(res.DT.users);
      setTotalUsers(res.DT.totalRows);
    }
  };

  const handleSHowModalUpdate = (item) => {
    setShowupdate(true);
    setDataItem(item);
  };

  const handleUpdateData = () => {
    setDataItem();
  };

  const handleShowModalDelete = (item) => {
    setShowDelete(true);
    setDataItem(item);
  };
  return (
    <div className="manage-user-container">
      <div className="title">
        <h4>Manage Users</h4>
      </div>
      <div className="users-content">
        <div>
          <button className="btn btn-primary" onClick={() => setShow(true)}>
            {" "}
            <i className="lni lni-circle-plus"></i> Add New User
          </button>
        </div>
        <div>
          <TableUser
            dataUser={dataUser}
            handleSHowModalUpdate={handleSHowModalUpdate}
            handleShowModalDelete={handleShowModalDelete}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            usersPerPage={usersPerPage}
            totalUsers={totalUsers}
          />
        </div>
        <ModalCreateUser show={show} setShow={setShow} fetchdata={fetchdata} />

        <ModalUpdateUser
          showupdate={showupdate}
          setShowupdate={setShowupdate}
          dataItem={dataItem}
          fetchdata={fetchdata}
          handleUpdateData={handleUpdateData}
        />

        <ModalDelete
          handleShowModalDelete={handleShowModalDelete}
          dataItem={dataItem}
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          fetchdata={fetchdata}
        />
      </div>
    </div>
  );
};

export default ManageUser;
