import "./Book.css";

import { useState, useRef, useEffect } from "react";

import pin from "../../assets/images/book/pin.png";

const Book = ({ pageContentArr = [], nameOfUser = "Phạm Minh Khôi" }) => {
  const numOfPage = pageContentArr.length + 2; // number of pages except the first cover and the last one
  console.log(numOfPage);

  // Ref
  const bookWrap = useRef();
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

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
                      {pageContentArr[i].content[0]}
                    </span>
                    {pageContentArr[i].content.substring(
                      1,
                      pageContentArr[i].content.length
                    )}
                  </p>
                </div>
                <div className="content__footer">
                  <p>{pageContentArr[i].date}</p>
                </div>
              </div>
            </div>
            <div className="book__paper-back">
              <div className="content">
                <div className="content__body">
                  <p>
                    {/* {isEnd && "Hãy viết tiếp nên câu chuyện của mình bạn nhé!"} */}
                  </p>
                </div>
                <div className="content__footer">
                  {/* <p>{pageContentArr[i + 1]?.date}</p> */}
                </div>
              </div>
            </div>
          </div>
        );
        page++;
      }
    } else {
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

  return (
    <div className="book">
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
                  {nameOfUser ? nameOfUser : "....................."}
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
              Hãy cùng chúng mình xem thử trong thời gian qua, cậu đã chia sẻ
              những gì cùng EaseMe nhé!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
