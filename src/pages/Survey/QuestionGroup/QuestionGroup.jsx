import "./QuestionGroup.css";
import Button from "../../../components/Button/Button";

const QuestionGroup = ({ label, answersList = [], handleChooseAnswer }) => {
  return (
    <div className="question-group__container">
      <div className="question-group__label">{label}</div>
      <div className="question-group__answers-section">
        {answersList.map((answer, id) => (
          <div
            className="question-group__answer-btn"
            style={{ "--delay": `${(id + 1) / 3}s` }}
            key={answer}
          >
            <Button
              text={answer}
              borderWidth={3}
              handelOnClick={handleChooseAnswer}
              props={{ data: id + 1 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionGroup;
