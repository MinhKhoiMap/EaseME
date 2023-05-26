import "./Book.css";

import { useState, useRef } from "react";

import pin from "../../assets/images/book/pin.png";

const Book = ({ pageContentArr = [], nameOfUser }) => {
  const numOfPage = pageContentArr.length;

  // Ref
  const bookWrap = useRef();
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  // function openBook() {}

  function closeBook() {}

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
    console.log("first");
    // console.log(currentPage, "ụa lạ quá à");
    if (!isOpen) setIsOpen(true);
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

  function loadPage() {
    const pageList = [];
    let page = 1;
    console.log(numOfPage, "wtf");
    for (let i = 0; i < pageContentArr.length; i += 1) {
      pageList.push(
        <div
          id={`p${i}`}
          key={`p${i}`}
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
                  {/* <span style={{ fontSize: "5rem" }}>
                    {pageContentArr[i + 1]?.content[0]}
                  </span>
                  {pageContentArr[i + 1]?.content.substring(
                    1,
                    pageContentArr[i + 1]?.content.length
                  )} */}
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
    return pageList;
  }

  return (
    <div className="book">
      <div
        className="book-section"
        ref={bookWrap}
        style={{ transform: isOpen && "translateX(50% )" }}
      >
        <div
          className="book-cover__left"
          style={{ zIndex: numOfPage + 1, userSelect: "none" }}
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
        <div className="book-cover__right" style={{ zIndex: 0 }}></div>
        <img
          className="book-pin"
          style={{ width: isOpen ? "60px" : "0" }}
          src={pin}
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
            Nhật ký EaseMe ở đây để cùng cậu theo dõi hành trình dỗ dành đứa trẻ
            bên trong bản thân cậu.
          </p>
          <p className="message">
            Hãy cùng chúng mình xem thử trong thời gian qua, cậu đã chia sẻ
            những gì cùng EaseMe nhé!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Book;
