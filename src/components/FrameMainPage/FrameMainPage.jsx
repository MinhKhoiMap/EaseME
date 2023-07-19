import "./FrameMainPage.css";
import { Link, Outlet } from "react-router-dom";

import NotePage from "../NotePage/NotePage";

const FrameMainPage = () => {
  const tagList = [
    {
      colorText: "#F7C800",
      backgroundColor: "#FFF0D0",
      colorDisc: "#FFCB57",
      borderColor: "#F7C800",
      tag: "Gia đình",
    },
    {
      colorText: "#FF8080",
      backgroundColor: "#FFE4E4",
      colorDisc: "#F594A9",
      borderColor: "#F594A9",
      tag: "Tình yêu",
    },
    {
      colorText: "#87A173",
      backgroundColor: "#E0F8DD",
      colorDisc: "#87A173",
      borderColor: "#87A173",
      tag: "Bạn bè",
    },
    {
      colorText: "#97AEDF",
      backgroundColor: "#E4F4FF",
      colorDisc: "#97AEDF",
      borderColor: "#97AEDF",
      tag: "Công việc",
    },
    {
      colorText: "#66B4B9",
      backgroundColor: "#D7F5F7",
      colorDisc: "#66B4B9",
      borderColor: "#66B4B9",
      tag: "Tâm trạng",
    },
    {
      colorText: "#BC2525",
      backgroundColor: "#FFE4E4",
      colorDisc: "#BC2525",
      borderColor: "#BC2525",
      tag: "nsfw",
    },
    {
      colorText: "#7D7D7D",
      backgroundColor: "#E9E9E9",
      colorDisc: "#7D7D7D",
      borderColor: "#7D7D7D",
      tag: "Khác",
    },
  ];

  return (
    <div className="frame-main-page">
      <div className="frame-main-page__container">
        <div className="left-section">
          <NotePage />
        </div>
        <div className="center-section">
          <Outlet />
        </div>
        <div className="right-section">
          <div className="sticky">
            <form className="search-bar">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết"
                spellCheck={false}
              />
              <button className="search-btn">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
            <div className="filter-tags">
              <h3 className="title">Chủ đề bài viết</h3>
              <ul className="tag-list">
                {tagList.map((tag) => (
                  <li
                    style={{
                      backgroundColor: tag.backgroundColor,
                      borderColor: tag.borderColor,
                    }}
                    key={tag.tag}
                  >
                    <i
                      className="fa-solid fa-circle"
                      style={{ color: tag.colorDisc }}
                    ></i>
                    <span style={{ color: tag.colorText }}>{tag.tag}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hotline-info">
              <h3 className="title">Cậu cần hỗ trợ?</h3>
              <p className="message">
                Nếu cậu đang thấy không ổn và cần sự hỗ trợ ngay lập tức, hãy
                liên hệ hotline EaseMe:
              </p>
              <a href="tel:+84 111 111 111">(+84) 111 111 111</a>
            </div>
            <footer className="more-page">
              <Link to="/aboutEaseMe">
                <p>Về EasMe</p>
              </Link>
              <Link to="/">
                <p>Quyền riêng tư</p>
              </Link>
              <Link to="/">
                <p>Chính sách bảo mật</p>
              </Link>
              <Link to="/">
                <p>Chính sách nội dung</p>
              </Link>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameMainPage;
