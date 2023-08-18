// Import libraries
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

// Import services
import postService from "../../services/post.service";

// Import redux utilities
import { retrieveTags } from "../../redux/slices/tagSlice";
import { tagsSelector } from "../../redux/selectors/tagSelector";

// Import styles
import "./MainPageLayout.css";

// Import components
import NotePage from "../NotePage/NotePage";
import Loader from "../Loader/Loader";
import TopNavBar from "../TopNavBar/TopNavBar";

const FrameMainPage = () => {
  const dispatch = useDispatch();
  const tagsData = useSelector(tagsSelector);

  const [isLoading, setIsLoading] = useState(false);

  const [tagsList, setTagsList] = useState([]);

  const tagsQuery = useQuery({
    queryKey: ["tags"],
    queryFn: () => {
      setIsLoading(true);
      return postService.getTags();
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setTagsList(tagsData);
  }, [tagsData]);

  useEffect(() => {
    if (!tagsQuery.isLoading) {
      setIsLoading(false);
    }
    if (tagsQuery.isSuccess) {
      dispatch(retrieveTags(tagsQuery.data.data.tags));
    }
  }, [tagsQuery.fetchStatus]);

  return (
    <div className="frame-main-page">
      <TopNavBar />
      <div className="frame-main-page__container">
        <div className="left-section">
          <div className="note-motivation">
            <NotePage />
          </div>
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
                {tagsList.map((tag) => (
                  <li
                    style={{
                      backgroundColor: tag.backgroundColor,
                      borderColor: tag.borderColor,
                    }}
                    key={tag._id}
                  >
                    <Link to={`/community/${tag._id}`}>
                      <i
                        className="fa-solid fa-circle"
                        style={{ color: tag.colorDisc }}
                      ></i>
                      <span style={{ color: tag.colorText }}>{tag.tag}</span>
                    </Link>
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

      {isLoading && <Loader />}
    </div>
  );
};

export default FrameMainPage;
