import { useEffect, useState } from "react";
import { getAllQuizAdmin } from "../../../Service/Quiz";

const TableQuiz = (props) => {
  const { dataListQuiz } = props;
  return (
    <div className="table">
      <table className="table table-striped table-hover table-bordered mt-3">
        <thead>
          <tr>
            <th scope="col">#id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataListQuiz && dataListQuiz.length > 0 ? (
            dataListQuiz.map((item, index) => {
              return (
                <>
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.difficulty}</td>

                    <td className="">
                      <button className="btn btn-warning m-1">Edit</button>
                      <button
                        className="btn btn-danger"
                        onClick={() => props.handlegetIdDeleteQuiz(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })
          ) : (
            <div></div>
          )}{" "}
        </tbody>
      </table>
    </div>
  );
};

export default TableQuiz;
