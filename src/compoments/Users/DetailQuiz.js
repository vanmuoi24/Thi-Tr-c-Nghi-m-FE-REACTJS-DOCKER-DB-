import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../Service/Quiz";
import _, { cloneDeep } from "lodash";
import "./Detai.scss";
import Question from "./Question";
import ModelResult from "./ModelResult";
const DetailQuiz = () => {
  const params = useParams();
  const quizid = params.id;
  const [dataQuiz, setdataQuiz] = useState([]);
  const [index, setindex] = useState(0);
  const [show, setShow] = useState(false);
  const [dataModal, setdataModal] = useState({});
  useEffect(() => {
    fetchQuestion();
  }, [quizid]);
  const local = useLocation();

  const fetchQuestion = async () => {
    let res = await getDataQuiz(quizid);
    if (res && res.EC === 0) {
      let raw = res.DT;

      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let detal = [];

          let questionDescription,
            image = null;
          let isChecked;
          value.forEach((item) => {
            detal.push(item.answers);
            questionDescription = item.description;
            image = item.image;
            item.answers.isChecked = false;
          });

          return {
            questionId: key,
            detal,
            questionDescription,
            image,
          };
        })
        .value();
      setdataQuiz(data);
    }
  };
  const handlePrivius = () => {
    if (dataQuiz.length > 0 && index !== 0) {
      setindex(index - 1);
    } else {
      setindex(dataQuiz.length - 1);
    }
  };

  const handleNext = () => {
    if (index + 1 <= dataQuiz.length) {
      setindex(index + 1);
    } else {
      setindex(0);
    }
  };
  const handleFinish = async () => {
    let payload = {
      quizId: +quizid,
      answers: [],
    };

    let obj = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((item) => {
        let questionId = item.questionId;
        let userAnswerId = [];
        item.detal.forEach((item) => {
          if (item.isChecked === true) {
            userAnswerId.push(item.id);
          }
        });
        obj.push({
          questionId: +questionId,
          userAnswerId,
        });
      });
    }
    payload.answers = obj;
    let res = await postSubmitQuiz(payload);
    if (res && res.EC === 0) {
      setShow(true);
      setdataModal(res);
    }
  };
  const handleCheckBox = (answerID, questionId) => {
    let dataQuizClone = cloneDeep(dataQuiz);

    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );

    if (question && question.detal) {
      let a = question.detal.map((item) => {
        if (item.id === answerID) {
          item.isChecked = !item.isChecked;
        }
        return item;
      });
      question.detal = a;
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setdataQuiz(dataQuizClone);
    }
  };
  return (
    <div className="detai-quiz-content container mt-4">
      <div className="left-content">
        <div className="title">
          Quiz {quizid} : {local?.state?.Title}
          <hr />
        </div>
        <Question
          data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : [""]}
          index={index}
          handleCheckBox={handleCheckBox}
        />
        <div className="footter">
          <button className="btn btn-primary" onClick={() => handlePrivius()}>
            Privious
          </button>
          <button className="btn btn-info" onClick={() => handleNext()}>
            Next
          </button>
          <button className="btn btn-warning" onClick={() => handleFinish()}>
            Finish
          </button>
        </div>
      </div>
      <div className="right-content"></div>
      <ModelResult show={show} setShow={setShow} dataModal={dataModal} />
    </div>
  );
};

export default DetailQuiz;
