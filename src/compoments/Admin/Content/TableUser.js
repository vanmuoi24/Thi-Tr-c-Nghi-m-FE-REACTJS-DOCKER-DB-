const TableUser = (props) => {
  const {
    dataUser,
    handleSHowModalUpdate,
    handleShowModalDelete,
    currentPage,
    setCurrentPage,
    usersPerPage,
    totalUsers,
  } = props;

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">#id</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataUser && dataUser.length > 0 ? (
            dataUser.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.username}</td>
                <td>{item.role}</td>
                <td>
                  <div className="group-btn">
                    <button type="button" className="btn btn-light">
                      <i className="lni lni-eye"></i> View
                    </button>
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => handleSHowModalUpdate(item)}
                    >
                      <i className="lni lni-pencil"></i> Update
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleShowModalDelete(item)}
                    >
                      <i className="lni lni-trash-can"></i> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={handlePreviousPage}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {[...Array(totalPages).keys()].map((number) => (
            <li
              key={number + 1}
              className={`page-item ${
                currentPage === number + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(number + 1)}
              >
                {number + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={handleNextPage}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TableUser;
