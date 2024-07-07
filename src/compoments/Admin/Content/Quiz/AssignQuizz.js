import { useEffect, useState } from "react";
import { getAllQuizAdmin, postAssignToQuiz } from "../../../Service/Quiz";
import Select from "react-select";
import { getAllUser } from "../../../Service/ApiService";
import { toast } from "react-toastify";

const AssignQuizz = () => {
  const [SelectQuiz, setSelectQuiz] = useState();
  const [SelectValue, setSelectValue] = useState();

  const [listQuiz, setListQuiz] = useState();
  const [type, setType] = useState();
  const [listUser, setSelectUser] = useState();
  useEffect(() => {
    fetdataAllQuiz();
    fetchdataUserAll();
  }, []);
  const fetdataAllQuiz = async () => {
    let res = await getAllQuizAdmin();

    if (res && res.EC === 0) {
      let data = res.DT;
      let a = data.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(a);
    }
  };
  const fetchdataUserAll = async () => {
    let res = await getAllUser();
    if (res && res.EC === 0) {
      let user = res.DT;
      let a = user.map((item, index) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username}- ${item.email}`,
        };
      });
      setSelectUser(a);
    }
  };
  const handleSaveAssignQuiz = async () => {
    let res = await postAssignToQuiz(SelectQuiz.value, SelectValue.value);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="assign-user-container row mx-2">
      <div className="select-quiz col-4">
        <label>Select Quiz : </label>
        <Select
          options={listQuiz}
          placeholder=""
          defaultValue={type}
          onChange={setSelectQuiz}
        />
      </div>

      <div className="select-quiz col-4 mx-2">
        <label>Select Quiz : </label>
        <Select
          options={listUser}
          placeholder=""
          defaultValue={type}
          onChange={setSelectValue}
        />
      </div>

      <div>
        <button
          className="btn btn-info mt-3 "
          onClick={() => handleSaveAssignQuiz()}
        >
          Save Assign
        </button>
      </div>
    </div>
  );
};

export default AssignQuizz;
