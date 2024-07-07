import { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../Service/Quiz";
import _, { cloneDeep, conforms } from "lodash";
import "./Detai.scss";
import Question from "./Question";
import ModelResult from "./ModelResult";
import RightContent from "./RightContent/RightContent";
import Breadcrumb from "react-bootstrap/Breadcrumb";
const DetailQuiz = () => {
  const params = useParams();
  const quizid = params.id;
  const [dataQuiz, setdataQuiz] = useState([]);
  const [index, setindex] = useState(0);
  const [show, setShow] = useState(false);
  const [dataModal, setdataModal] = useState({});
  const [disLableFish, setdisLableFish] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
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
          value.forEach((item) => {
            detal.push(item.answers);
            questionDescription = item.description;
            image = item.image;
            item.answers.isChecked = false;
            item.answers.isCorrect = false;
          });
          detal = _.orderBy(detal, ["id"], ["asc"]);

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
  useEffect(() => {
    fetchQuestion();
  }, [quizid]);
  const handlePrivius = () => {
    if (dataQuiz.length > 0 && index !== 0) {
      setindex(index - 1);
    } else {
      setindex(dataQuiz.length - 1);
    }
  };

  const handleNext = () => {
    if (index + 1 <= dataQuiz.length - 1) {
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
      setdisLableFish(true);
      setShow(true);
      setdataModal(res);
      let dataQuizClone = _.cloneDeep(dataQuiz);
      let a = res.DT.quizData;
      for (let q of a) {
        for (let i = 0; i < dataQuizClone.length; i++) {
          if (+q.questionId === +dataQuizClone[i].questionId) {
            let newAnwers = [];
            for (let j = 0; j < dataQuizClone[i].detal.length; j++) {
              let s = q.systemAnswers.find(
                (item) => +item.id === +dataQuizClone[i].detal[j].id
              );

              if (s) {
                dataQuizClone[i].detal[j].isCorrect = true;
              }
              newAnwers.push(dataQuizClone[i].detal[j]);
            }
            dataQuizClone[i].detal = newAnwers;
          }
        }
      }
      setdataQuiz(dataQuizClone);
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
    <>
      {" "}
      <Breadcrumb className="container mt-3">
        <NavLink to={"/"} className="fontlink breadcrumb-item">
          Home
        </NavLink>
        <NavLink to={"/users"} className="fontlink breadcrumb-item">
          Users
        </NavLink>
        <Breadcrumb.Item active className="fontlink">
          Quiz
        </Breadcrumb.Item>
      </Breadcrumb>
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
            disLableFish={disLableFish}
            showAnswer={showAnswer}
          />
          <div className="footter">
            <button className="btn btn-primary" onClick={() => handlePrivius()}>
              Privious
            </button>
            <button className="btn btn-info" onClick={() => handleNext()}>
              Next
            </button>
            <button
              className="btn btn-warning"
              onClick={() => handleFinish()}
              disabled={disLableFish}
            >
              Finish
            </button>
          </div>
        </div>
        <div className="right-content">
          <RightContent
            dataQuiz={dataQuiz}
            handleFinish={handleFinish}
            setindex={setindex}
          />
        </div>
        <ModelResult
          show={show}
          setShow={setShow}
          dataModal={dataModal}
          setShowAnswer={setShowAnswer}
        />
      </div>
    </>
  );
};

export default DetailQuiz;
