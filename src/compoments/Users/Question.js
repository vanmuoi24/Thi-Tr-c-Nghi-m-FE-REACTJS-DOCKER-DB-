import _ from "lodash";
const Question = (props) => {
  const { data, index, disLableFish, showAnswer } = props;

  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleOnChange = (event, aId, qId) => {
    props.handleCheckBox(aId, qId);
  };
  console.log(data);
  return (
    <div className="list_quiz">
      {data && data.image ? (
        <div className="img-quiz">
          <img src={`data:image/jpeg;base64,${data.image}`} />
        </div>
      ) : (
        <></>
      )}
      <div className="title-quetion">
        Question {index + 1} : {data.questionDescription}
      </div>
      <div className="answer">
        {data && data.detal ? (
          data.detal.map((item) => {
            return (
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={(event) =>
                      handleOnChange(event, item.id, data.questionId)
                    }
                    disabled={disLableFish}
                  />

                  <label className="form-check-label">{item.description}</label>

                  {showAnswer === true && (
                    <>
                      {item.isChecked === true && item.isCorrect === false && (
                        <i className="fa-solid fa-x false"></i>
                      )}
                      {item.isCorrect === true && (
                        <i className="fa-solid fa-check true"></i>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Question;
