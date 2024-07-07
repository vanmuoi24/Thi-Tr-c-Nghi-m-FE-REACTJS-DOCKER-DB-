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

const getAllQuizAdmin = () => {
  return instance.get("api/v1/quiz/all");
};
const postCreateQuiz = (name, description, difficulty, images) => {
  const form = new FormData();
  form.append("name", name);
  form.append("description", description);
  form.append("difficulty", difficulty);
  form.append("quizImage", images);
  return instance.post("api/v1/quiz", form);
};
const deleteQuiz = (id) => {
  return instance.delete(`api/v1/quiz/${id}`);
};
const postCreateNewQuistionForQuiz = (quiz_id, description, questionImage) => {
  const form = new FormData();
  form.append("quiz_id", +quiz_id);
  form.append("description", description);
  form.append("questionImage", questionImage);

  return instance.post("api/v1/question", form);
};
const postAssignToQuiz = (quizId, userId) => {
  return instance.post("api/v1/quiz-assign-to-user", {
    quizId,
    userId,
  });
};

const getQuixWhitQA = (quizId) => {
  return instance.get(`api/v1/quiz-with-qa/${quizId}`);
};

const postQuizUpsertQa = (data) => {
  return instance.post(`api/v1/quiz-upsert-qa`, {
    ...data,
  });
};
export {
  postQuizUpsertQa,
  getQuixWhitQA,
  getListQuiz,
  getDataQuiz,
  postSubmitQuiz,
  postCreateQuiz,
  getAllQuizAdmin,
  deleteQuiz,
  postCreateNewQuistionForQuiz,
  postAssignToQuiz,
};
