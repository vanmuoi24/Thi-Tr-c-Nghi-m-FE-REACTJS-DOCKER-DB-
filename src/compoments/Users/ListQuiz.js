import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getAllQuizAdmin, getListQuiz } from "../Service/Quiz";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";
function ListQuiz() {
  const [dataQuiz, setdataQuiz] = useState();
  let navigate = useNavigate();
  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    let res = await getListQuiz();
    if (res && res.EC === 0) {
      setdataQuiz(res.DT);
    }
  };
  const handlebyId = (id) => {
    navigate(`/quiz/${id.id}`, {
      state: { Title: id.description },
    });
  };
  return (
    <div className="list_quiz_container container ">
      {dataQuiz &&
        dataQuiz.length > 0 &&
        dataQuiz.map((item, index) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={`data:image/jpeg;base64,${item.image}`}
                alt="Quiz Image"
              />
              <Card.Body>
                <Card.Title> Quiz {index + 1}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Button variant="primary" onClick={() => handlebyId(item)}>
                  Go somewhere
                </Button>
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
}

export default ListQuiz;
