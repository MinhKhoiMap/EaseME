import "./NotePage.css";

import Notes from "../Notes/Notes";

const NotePage = () => {
  const quotes = [
    "Hôm nay cậu đã làm rất tốt rồi!",
    "Hãy tin vào chính mình, cậu có thể vượt qua mọi khó khăn",
    "Hãy nhìn về phía trước và không hối tiếc quá khứ",
    "Thay đổi không dễ dàng, nhưng nó đáng giá",
    "Cuộc sống là món quà, hãy sống một cách trọn vẹn",
    "Mọi việc sẽ ổn thôi!",
    "Hãy nhớ rằng cậu không cô đơn",
    "Đừng so sánh bản thân với người khác, mỗi người đều có hành trình riêng",
  ];

  return (
    <div className="note-page__container">
      {quotes.map((quote) => (
        <div className="note" key={quote}>
          <Notes
            noteType={Math.floor(Math.random() * (5 - 1)) + 1}
            text={quote}
            colorText={"#87A173"}
          />
        </div>
      ))}
    </div>
  );
};

export default NotePage;
