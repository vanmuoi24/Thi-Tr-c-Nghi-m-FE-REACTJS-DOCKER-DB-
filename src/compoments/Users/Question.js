import _ from "lodash";
const Question = (props) => {
  const { data, index } = props;

  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleOnChange = (event, aId, qId) => {
    props.handleCheckBox(aId, qId);
  };
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
                  />
                  <label className="form-check-label">{item.description}</label>
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
