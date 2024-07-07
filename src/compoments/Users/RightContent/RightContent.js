import React, { useEffect, useRef, useState } from "react";
import CountDown from "./CountDown";

const RightContent = (props) => {
  const { dataQuiz, handleFinish } = props;
  const refDiv = useRef([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const timterOver = () => {
    handleFinish();
  };

  const getClassQuesstion = (question, index) => {
    if (question && question.detal.length > 0) {
      let check = question.detal.some((a) => a.isChecked === true);
      if (check === true) {
        return "question active ";
      }
    }
    return "question ";
  };
  const handleCLickQuestion = (index) => {
    props.setindex(index);
    const selectedElement = refDiv.current[index];

    selectedElement.classList.add("click");
    setSelectedIndex(index);
  };
  return (
    <>
      {" "}
      <div className="main-tinner">
        <span className="span-time">
          <CountDown timterOver={timterOver} />
        </span>
      </div>
      <div className="main-questions">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            if (!refDiv.current[index]) {
              refDiv.current[index] = React.createRef();
            }

            return (
              <div
                className={`${
                  getClassQuesstion(item) +
                  (selectedIndex === index ? " click" : "")
                }`}
                key={item.id}
                onClick={() => handleCLickQuestion(index)}
                ref={(el) => (refDiv.current[index] = el)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
