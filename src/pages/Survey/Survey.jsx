import "./Survey.css";
import QuestionGroup from "./QuestionGroup/QuestionGroup";

import { useState } from "react";

const Survey = () => {
  const label = [
    {
      text: "Cau co on khong?",
      answersList: ["Kó", "Không", "Tớ không biết nữa"],
    },
    {
      text: "Cau co can giup do ngay khong?",
      answersList: ["Goi den hotline ho tro", "Khong can dau"],
    },
    {
      text: "Dao nay cau hay thay lo lang chu?",
      answersList: ["Gan nhu moi ngay", "Doi khi", "Thuong xuyen", "Khong co"],
    },
  ];
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const test = (id) => {
    console.log(id, "id");
    if (id < label.length) {
      return (
        <QuestionGroup
          label={label[id].text}
          answersList={label[id].answersList}
          handleChooseAnswer={(e) => {
            setScore((prev) => prev + Number(e.target.attributes.data.value));
            setSurvey(() => test(id + 1));
            // console.log([e.target], [e.target.attributes.data.value]);
          }}
          key={id}
        />
      );
    } else {
      setShowScore(true);
    }
  };
  const [survey, setSurvey] = useState(test(0));

  return (
    <div className="survey-test__wrapper">
      {survey}
      {showScore && <div style={{ fontSize: "2.2rem" }}>Score: {score}</div>}
    </div>
  );
};

export default Survey;
