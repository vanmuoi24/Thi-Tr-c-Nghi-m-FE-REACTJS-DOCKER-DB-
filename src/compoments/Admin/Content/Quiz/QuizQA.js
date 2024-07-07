import { useEffect, useState } from "react";
import Select from "react-select";
import "../Question/ManageQuestion.scss";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import {
  getAllQuizAdmin,
  getListQuiz,
  getQuixWhitQA,
  postCreateNewQuistionForQuiz,
  postQuizUpsertQa,
} from "../../../Service/Quiz";
import { postCreateNewAnswerForQuestion } from "../../../Service/Answer";
import { toast } from "react-toastify";
import { Toast } from "bootstrap";

const QuizQA = () => {
  const [initQuestion, setinItQuestion] = useState([
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ]);
  const [type, setType] = useState();

  const [listQuiz, setListQuiz] = useState();
  const [SelectQuiz, setSelectQuiz] = useState();
  const [questions, setQuestion] = useState(initQuestion);
  const [resetKey, setResetKey] = useState();
  useEffect(() => {
    fetdataAllQuiz();
  }, []);

  useEffect(() => {
    fetchDataQuizWhitQA();
  }, [SelectQuiz]);

  const fetchDataQuizWhitQA = async () => {
    if (SelectQuiz) {
      let res = await getQuixWhitQA(SelectQuiz.value);
      if (res && res.EC === 0) {
        let data = res.DT.qa.map((item, index) => {
          if (item.imageFile) {
            const imageFile = base64ToFile(item.imageFile, item.imageName);
            return { ...item, imageFile };
          }
          return item;
        });
        console.log(data);
        setQuestion(data);
      }
    }
  };

  const base64ToFile = (base64, filename) => {
    if (!base64) return null; 
    const arr = base64.split(",");
    if (arr.length !== 2) return null; 
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

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
  const HandleAddandRemoveQuiz = (type, id) => {
    if (type === "ADD") {
      const newquestion = {
        id: uuidv4(),
        descriptions: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestion([...questions, newquestion]);
    }

    if (type === "REMOVE") {
      let cloneQuestion = _.cloneDeep(questions);
      cloneQuestion = cloneQuestion.filter((item) => item.id !== id);
      setQuestion(cloneQuestion);
    }
  };

  const HanleAddAndRemoveAnswer = (type, questionId, answerID) => {
    let questionClone = _.cloneDeep(questions);

    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      let index = questionClone.findIndex((item) => item.id === questionId);
      questionClone[index].answers.push(newAnswer);
      setQuestion(questionClone);
    }

    if (type === "REMOVE") {
      let index = questionClone.findIndex((item) => item.id === questionId);
      questionClone[index].answers = questionClone[index].answers.filter(
        (item) => item.id !== answerID
      );
      setQuestion(questionClone);
    }
  };

  const handleOnchange = (type, questionId, value) => {
    let questionClone = _.cloneDeep(questions);
    if (type === "QUESTION") {
      let index = questionClone.findIndex((item) => item.id === questionId);
      if (index >= -1) questionClone[index].description = value;
      setQuestion(questionClone);
    }
  };

  const handleFileimageFile = (questionId, event) => {
    let questionClone = _.cloneDeep(questions);

    let index = questionClone.findIndex((item) => item.id === questionId);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionClone[index].imageFile = event.target.files[0];
      questionClone[index].imageName = event.target.files[0].name;
    }

    setQuestion(questionClone);
  };

  const handleAnsersQuestion = (type, questionId, answerID, value) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);

    if (index > -1) {
      questionClone[index].answers = questionClone[index].answers.map(
        (item, index) => {
          if (item.id === answerID) {
            if (type === "CHECKBOX") {
              item.isCorrect = value;
            }
            if (type === "INPUT") {
              item.description = value;
            }
          }
          return item;
        }
      );
      setQuestion(questionClone);
    }
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  const handleSaveQuestion = async () => {
    if (_.isEmpty(SelectQuiz)) {
      toast.error("Plese chose a Quiz");
      return;
    }

    let cohieu = true;
    let cohieuQ = true;
    let indexQ = 0;
    let indexQ1 = 0;
    let indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          cohieu = false;
          indexA = j;
          break;
        }
      }
      indexQ = i;
      if (cohieu === false) {
        break;
      }
    }

    if (cohieu === false) {
      toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`);
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        cohieuQ = false;
        indexQ1 = i;
      }
    }
    if (cohieuQ === false) {
      toast.error(`Not empty Question ${indexQ1 + 1}`);
      return;
    }

    let questionClone = _.cloneDeep(questions);
    console.log(questionClone);
    for (let i = 0; i < questionClone.length; i++) {
      if (questionClone[i].imageFile) {
        questionClone[i].imageFile = await toBase64(questionClone[i].imageFile);
      }
    }

    let res = await postQuizUpsertQa({
      quizId: SelectQuiz.value,
      questions: questionClone,
    });
    if (res && res.EC === 0) {
      toast.success("Update a new answer succeed");

      setQuestion(initQuestion);
      setResetKey("");
      setSelectQuiz(null);
    }
  };

  return (
    <div className="manage-question-container">
      <div className="title">Manage Question</div>
      <div className="select-quiz col-4">
        <label>Select Quiz : </label>
        <Select
          options={listQuiz}
          key={resetKey}
          placeholder=""
          defaultValue={type}
          onChange={setSelectQuiz}
        />
      </div>
      {questions &&
        questions.length &&
        questions.map((item, index) => {
          return (
            <div>
              <hr></hr>{" "}
              <div className="group-addDescription">
                <div className="mb-3 col-4">
                  <label>Add Desctription {index + 1}:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Description ${index + 1}`}
                    value={item.description}
                    onChange={(event) =>
                      handleOnchange("QUESTION", item.id, event.target.value)
                    }
                  />
                </div>
                <div className="icon-and-file  col-4">
                  {" "}
                  <div className="uploadfile">
                    {" "}
                    <label htmlFor="img">
                      {" "}
                      <i className="lni lni-image"></i>
                    </label>
                    <input
                      type="file"
                      id="img"
                      hidden
                      onChange={(event) => handleFileimageFile(item.id, event)}
                    ></input>
                    <p>0 file upload</p>
                  </div>
                  <div className="icon">
                    <i
                      className="lni lni-circle-plus"
                      onClick={() => HandleAddandRemoveQuiz("ADD", "")}
                    ></i>

                    {questions.length > 1 && (
                      <i
                        className="lni lni-circle-minus"
                        onClick={() =>
                          HandleAddandRemoveQuiz("REMOVE", item.id)
                        }
                      >
                        {" "}
                      </i>
                    )}
                  </div>
                </div>
              </div>
              <>
                {item.answers &&
                  item.answers.length &&
                  item.answers.map((item1, index) => {
                    return (
                      <div className="answer" key={index.id}>
                        {" "}
                        <div className=" checkbox form-check ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={item1.isCorrect}
                            onChange={(event) =>
                              handleAnsersQuestion(
                                "CHECKBOX",
                                item.id,
                                item1.id,
                                event.target.checked
                              )
                            }
                          />
                        </div>
                        <div className="icon-answer col-6 ">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={`Answer ${index + 1}`}
                            value={item1.description}
                            onChange={(event) =>
                              handleAnsersQuestion(
                                "INPUT",
                                item.id,
                                item1.id,
                                event.target.value
                              )
                            }
                          />
                          <div className="icon">
                            <i
                              className="lni lni-circle-plus"
                              onClick={() =>
                                HanleAddAndRemoveAnswer("ADD", item.id)
                              }
                            ></i>
                            {item.answers.length > 1 && (
                              <i
                                className="lni lni-circle-minus"
                                onClick={() =>
                                  HanleAddAndRemoveAnswer(
                                    "REMOVE",
                                    item.id,
                                    item1.id
                                  )
                                }
                              ></i>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </>
            </div>
          );
        })}

      <div>
        {questions && questions.length > 0 && (
          <button
            className="btn btn-primary mt-4"
            onClick={() => handleSaveQuestion()}
          >
            Save Question
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizQA;
