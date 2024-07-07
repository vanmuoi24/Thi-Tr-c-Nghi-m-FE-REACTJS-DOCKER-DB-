import instance from "../Utils/axiosCustomize";

const postCreateNewAnswerForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return instance.post(`api/v1/answer`, {
    description,
    correct_answer,
    question_id,
  });
};

export { postCreateNewAnswerForQuestion };
