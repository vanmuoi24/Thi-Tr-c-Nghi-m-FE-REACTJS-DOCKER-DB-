import instance from "../Utils/axiosCustomize";

const getListQuiz = () => {
  return instance.get("api/v1/quiz-by-participant");
};

const getDataQuiz = (quiId) => {
  return instance.get(`api/v1/questions-by-quiz?quizId=${quiId}`);
};

const postSubmitQuiz = (data) => {
  return instance.post(`api/v1/quiz-submit`, {
    ...data,
  });
};
export { getListQuiz, getDataQuiz, postSubmitQuiz };
