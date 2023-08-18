// Import libraries
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

// Import services
import PostService from "../../services/post.service";

// Import redux services
import { userNameSelector } from "../../redux/selectors/userSelector";

// Import styles
import "./Book.css";

// Import images
import pin from "../../assets/images/book/pin.png";
import TopNavBar from "../../components/TopNavBar/TopNavBar";

// const token_test =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiNjRhNmQ2Y2ZhMzkyMmQ1ZDQ3Y2NkNDY4IiwiaWF0IjoxNjkwNzY4NDc5fQ.nk0gDmaSiKEqROe90V0ceiA7Ioef7dqXviHWy4S9gEo";

/* Functional Component */
const Book = () => {
  const nameSelector = useSelector(userNameSelector);

  // book Ref
  const bookWrap = useRef();
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [pageContentArr, setPageContentArr] = useState([]);

  const bookContentQuery = useQuery({
    queryKey: ["my-book"],
    queryFn: () => {
      return PostService.getUserPosts(localStorage.getItem("access_token"));
    },
    onSuccess: (response) => {
      // console.log(
      //   String(response.data.posts[0].postDate).substring(
      //     String(response.data.posts[0].postDate).search(",") + 1,
      //     String(response.data.posts[0].postDate).length
      //   )
      // );
      setPageContentArr(response.data.posts);
    },
  });

  const numOfPage = pageContentArr.length + 2; // number of pages includes the first cover and the last one
  // console.log(numOfPage);

  function goPrevPage() {
    if (currentPage > 1) {
      // console.log(currentPage);
      let locaPage = currentPage;
      locaPage > numOfPage && (locaPage = numOfPage);
      let prevNode = bookWrap.current.childNodes[locaPage - 2];
      let currentNode = bookWrap.current.childNodes[locaPage - 1];
      if (currentPage <= numOfPage) {
        prevNode.classList.remove("flipped");
        prevNode.style.zIndex = numOfPage - locaPage + 2;
      }
      currentNode.classList.remove("flipped");
      currentNode.style.zIndex = numOfPage - locaPage + 1;
      setIsEnd(false);
      setCurrentPage((prev) => prev - 1);
    }
    if (currentPage === 2) {
      setIsOpen(false);
    }
  }

  function goNextPage() {
    // console.log("first");
    // console.log(currentPage, "ụa lạ quá à");
    if (!isOpen) {
      setIsOpen(true);
      openBook();
    } else {
      if (currentPage < numOfPage + 1) {
        // console.log("ủa :)))", currentPage, numOfPage - 1);
        let currentNode = bookWrap.current.childNodes[currentPage - 1];
        currentNode.classList.add("flipped");
        currentNode.style.zIndex = currentPage;
        setCurrentPage((prev) => prev + 1);
      } else {
        setIsEnd(true);
      }
    }
  }

  function openBook() {
    let coverNode = bookWrap.current.childNodes[0];
    coverNode.classList.add("flipped");
    coverNode.style.zIndex = 1;
    setCurrentPage((prev) => prev + 1);
  }

  function loadPage() {
    const pageList = [];
    let page = 2;
    // console.log(numOfPage, "wtf");
    if (pageContentArr.length > 0) {
      for (let i = 0; i < pageContentArr.length; i += 1) {
        pageList.push(
          <div
            id={`p${page}`}
            key={`p${page}`}
            className="book__paper"
            style={{ zIndex: numOfPage - page + 1 }}
          >
            <div className="book__paper-front">
              <div className="content">
                <div className="content__body">
                  <p>
                    <span style={{ fontSize: "5rem" }}>
                      {pageContentArr[i].contentText[0]}
                    </span>
                    {pageContentArr[i].contentText.substring(
                      1,
                      pageContentArr[i].contentText.length
                    )}
                  </p>
                </div>
                <div className="content__footer">
                  <p>{i === 0 && pageContentArr[i].postDate}</p>
                </div>
              </div>
            </div>
            <div className="book__paper-back">
              <div className="content">
                <div className="content__body">
                  <p
                    style={{
                      fontSize: isEnd && "3.5rem",
                      fontWeight: "500",
                      fontStyle: "italic",
                    }}
                  >
                    {isEnd && "Hãy viết tiếp nên câu chuyện của mình bạn nhé!"}
                  </p>
                </div>
                <div className="content__footer">
                  <p>{pageContentArr[i + 1]?.postDate}</p>
                </div>
              </div>
            </div>
          </div>
        );
        page++;
      }
    }
    return pageList;
  }

  useEffect(() => {
    if (currentPage >= numOfPage) {
      setIsEnd(true);
    } else {
      setIsEnd(false);
    }
  }, [currentPage, numOfPage]);

  /* ************ Render JSX ************ */
  return (
    <div className="book">
      <TopNavBar />
      <div className="book__wrapper">
        <div
          className="book-section"
          ref={bookWrap}
          style={{ transform: isOpen && "translateX(50%)" }}
        >
          <div
            className="book-cover__left"
            style={{ zIndex: numOfPage, userSelect: "none" }}
          >
            <div className="book-cover__left-front">
              <div className="content">
                <p className="label">Hành trình của</p>
                <p className="name">
                  {nameSelector || "....................."}
                </p>
              </div>
            </div>
            <div className="book-cover__left-back">
              <div className="content">good things take time.</div>
            </div>
          </div>
          {loadPage()}
          <div className="book-cover__right" style={{ zIndex: 1 }}></div>
          <img
            className="book-pin"
            style={{ width: isOpen && !isEnd ? "60px" : "0" }}
            src={pin}
            alt="book pin"
          />
          {isOpen && (
            <button className="prev-btn" onClick={goPrevPage}>
              Prev
            </button>
          )}
          {!isEnd && (
            <button className="next-btn" onClick={goNextPage}>
              Next
            </button>
          )}
        </div>
        <div className="book__note" style={{ visibility: isOpen && "hidden" }}>
          <div className="question">Nhật ký là gì nhỉ?</div>
          <div className="content">
            <p className="answer">
              Nhật ký EaseMe ở đây để cùng cậu theo dõi hành trình dỗ dành đứa
              trẻ bên trong bản thân cậu.
            </p>
            <p className="message">
              {nameSelector
                ? "Hãy cùng chúng mình xem thử trong thời gian qua, cậu đã chia sẻ những gì cùng EaseMe nhé!"
                : "Hãy đăng nhập để xem hoặc ghi tiếp những chặng đường của bạn nhé!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
