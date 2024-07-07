import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getDataHistryQuiz } from "../../Service/Profile";
import moment from "moment";
const HistryQuiz = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fechtDataHistry();
  }, []);
  const fechtDataHistry = async () => {
    let res = await getDataHistryQuiz();
    if (res && res.EC === 0) {
      setData(res.DT.data);
    }
  };
  const formatDtae = (data) => {
    const vietnamDate = moment.utc(data).utcOffset(7);
    return vietnamDate.format("DD/MM/YYYY HH:mm:ss A");
  };
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Quiz Name</th>
            <th>Total Question</th>
            <th>Total Correct</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length &&
            data.map((item, index) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.quizHistory.name}</td>
                  <td>{item.total_questions}</td>
                  <td>{item.total_correct}</td>
                  <td>{formatDtae(item.createdAt)}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default HistryQuiz;
