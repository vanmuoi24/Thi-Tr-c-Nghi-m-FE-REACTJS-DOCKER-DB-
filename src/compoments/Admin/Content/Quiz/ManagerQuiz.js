import "./ManagerQuiz.scss";
import Select from "react-select";
import "../Modal.scss";
import { useEffect, useState } from "react";
import { getAllQuizAdmin, postCreateQuiz } from "../../../Service/Quiz";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import QuizQA from "./QuizQA";
import AssignQuizz from "./AssignQuizz";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
const ManagerQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [selectedOption, setSelectedOption] = useState(null);
  const [image, setImage] = useState(null);
  const [idItem, setIdItem] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [dataListQuiz, setDataListQuiz] = useState("");
  const options = [{ value: "MEDIUM", label: "MEDIUM" }];
  const handleImageChange = (e) => {
    if (e.target && e.target.value && e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      //   setImage(null);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    let res = await getAllQuizAdmin();
    if (res && res.EC === 0) {
      setDataListQuiz(res.DT);
    }
  };
  const handleSaveQuiz = async () => {
    let res = await postCreateQuiz(name, description, type?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      fetchdata();
    } else {
      toast.error(res.EM);
    }
  };
  const handlegetIdDeleteQuiz = (id) => {
    if (id) {
      setIdItem(id);
      setShowDelete(true);
    }
  };
  return (
    <>
      <Tabs
        defaultActiveKey="profile"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="profile" title="Manage Quizzes">
          <div>
            <fieldset class=" p-2 field-set">
              <legend class="float-none w-auto p-2">Add New Quiz</legend>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Descrtription
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder=" Descrtription"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
              <div>
                <label for="exampleFormControlInput1" class="form-label">
                  Quiz Type
                </label>
                <Select
                  options={options}
                  placeholder="Quiz Type"
                  onChange={setType}
                  defaultValue={type}
                  value={type}
                />
              </div>
              <div className="group-btn">
                <div>
                  {" "}
                  <label className="btn1 btn" htmlFor="lableUp">
                    {" "}
                    <i className="lni lni-circle-plus"></i>
                    <span>Upload file</span>
                  </label>
                  <div className="custom-file">
                    <input
                      id="lableUp"
                      type="file"
                      className="custom-file-input"
                      hidden
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSaveQuiz()}
                  >
                    SaveQuizz (+)
                  </button>
                </div>
              </div>
            </fieldset>
          </div>
          <TableQuiz
            handlegetIdDeleteQuiz={handlegetIdDeleteQuiz}
            dataListQuiz={dataListQuiz}
          />
        </Tab>
        <Tab eventKey="longer-tab" title="UpDate QA">
          <QuizQA />
        </Tab>
        <Tab eventKey="Assign Quizz" title="Assign Quizz">
          <AssignQuizz />
        </Tab>
      </Tabs>

      {/* <div className="quiz-container">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Manage Quizzes</Accordion.Header>
            <Accordion.Body>
              <div>
                <fieldset class=" p-2 field-set">
                  <legend class="float-none w-auto p-2">Add New Quiz</legend>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Descrtription
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder=" Descrtription"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </div>
                  <div>
                    <label for="exampleFormControlInput1" class="form-label">
                      Quiz Type
                    </label>
                    <Select
                      options={options}
                      placeholder="Quiz Type"
                      onChange={setType}
                      defaultValue={type}
                      value={type}
                    />
                  </div>
                  <div className="group-btn">
                    <div>
                      {" "}
                      <label className="btn1 btn" htmlFor="lableUp">
                        {" "}
                        <i className="lni lni-circle-plus"></i>
                        <span>Upload file</span>
                      </label>
                      <div className="custom-file">
                        <input
                          id="lableUp"
                          type="file"
                          className="custom-file-input"
                          hidden
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleSaveQuiz()}
                      >
                        SaveQuizz (+)
                      </button>
                    </div>
                  </div>
                </fieldset>
              </div>
              <TableQuiz
                handlegetIdDeleteQuiz={handlegetIdDeleteQuiz}
                dataListQuiz={dataListQuiz}
              />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>UpDate QA</Accordion.Header>
            <Accordion.Body>
              <QuizQA />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>AssignQuizz</Accordion.Header>
            <Accordion.Body>
              {" "}
              <AssignQuizz />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div></div>

        <ModalDeleteQuiz
          idItem={idItem}
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          fetchdata={fetchdata}
        />
      </div> */}
    </>
  );
};

export default ManagerQuiz;
