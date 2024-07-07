const TotalQuiz = (props) => {
  const { dataView } = props;

  return (
    <>
      <div className="header-content">
        <div className="content-chill">
          <div className="chill">
            <soan>Total User</soan>
            <span>{dataView?.users?.total}</span>
          </div>
          <div className="chill">
            {" "}
            <soan>Total Quiz</soan>
            <span>{dataView?.others?.countQuiz}</span>
          </div>
          <div className="chill">
            {" "}
            <soan>Total Question</soan>
            <span>{dataView?.others?.countQuestions}</span>
          </div>
          <div className="chill">
            {" "}
            <soan>Total Answer</soan>
            <span>{dataView?.others?.countAnswers}</span>
          </div>
        </div>
        <div className="header-chart"></div>
      </div>
    </>
  );
};

export default TotalQuiz;
