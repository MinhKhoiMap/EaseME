import { useState } from "react";
import "./MyDiary.css";

import MessageComp from "../../components/MessageComp/Message";
import PostFrame from "../../components/PostFrame/PostFrame";
import Post from "../../components/Post/Post";

const MyDiary = () => {
  const [contentPost, setContentPost] = useState("");
  const [isReactUser, setIsReactUser] = useState(false);

  return (
    <div className="my-diary">
      <div className="my-diary__container">
        <div className="my-diary__header">
          <MessageComp content="Nếu cậu thấy không vui, cứ dùng nơi này để viết gì đó cho bản thân, dù chỉ là một câu chào cũng được ❤️" />
        </div>
        <div className="my-diary__body">
          <div className="my-diary__post-story">
            <PostFrame
              contentPost={contentPost}
              setContentPost={setContentPost}
            />
          </div>
          <div className="my-diary__all-my-post">
            <Post
              username="Chiến thần thất nghiệp"
              privacyIcon={<i className="fa-solid fa-lock"></i>}
              content={contentPost}
              isReact={isReactUser}
              isDoctor={true}
              changeReactFunc={setIsReactUser}
              date={new Date().toLocaleString()}
              menuItemsList={[
                {
                  icon: <i className="fa-solid fa-triangle-exclamation"></i>,
                  label: "Báo cáo bài viết",
                  explainText: "Chúng tôi sẽ bảo mật danh tính người báo cáo",
                },
                {
                  icon: <i className="fa-regular fa-trash-can"></i>,
                  label: "Chuyển vào thùng rác",
                  explainText:
                    "Các bài viết trong thùng rác sẽ bị xóa sau 7 ngày",
                },
              ]}
            />
            <Post
              username="Chiến thần thất nghiệp"
              privacyIcon={<i className="fa-solid fa-lock"></i>}
              content={contentPost}
              isReact={isReactUser}
              isDoctor={true}
              changeReactFunc={setIsReactUser}
              date={new Date().toLocaleString()}
              menuItemsList={[
                [
                  {
                    icon: <i className="fa-solid fa-triangle-exclamation"></i>,
                    label: "Báo cáo bài viết",
                    explainText: "Chúng tôi sẽ bảo mật danh tính người báo cáo",
                  },
                  {
                    icon: <i className="fa-solid fa-triangle-exclamation"></i>,
                    label: "Báo cáo bài viết",
                    explainText: "Chúng tôi sẽ bảo mật danh tính người báo cáo",
                  },
                ],
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDiary;
