// Import libraries
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Import services
import PostServices from "../../services/post.service";

// Import styles
import "./Post.css";

// Import image
import auth_tick from "../../assets/images/auth-tick.png";
import defautlAva from "../../assets/images/avatar-default.png";

// Import components
import Loader from "../Loader/Loader";

// const token_test =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiNjRhNmQ2Y2ZhMzkyMmQ1ZDQ3Y2NkNDY4IiwiaWF0IjoxNjkwNzY4NDc5fQ.nk0gDmaSiKEqROe90V0ceiA7Ioef7dqXviHWy4S9gEo";

const Post = ({
  id_post,
  avaURL = defautlAva,
  username = "Người dùng ẩn danh",
  privacyIcon,
  content,
  date,
  tag,
  reactNum,
  isReact = false,
  isDoctor = false,
  menuItemsList = [],
}) => {
  const contentHTML = useRef();
  const queryClient = useQueryClient();

  // console.log("first", id_post);

  const [isReadLess, setIsReadLess] = useState(false);
  const [showReadOptsButton, setShowReadOptsButton] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const likePostMutation = useMutation({
    mutationFn: (id_post) => {
      // setIsLoading(true);
      return PostServices.likePost(
        id_post,
        localStorage.getItem("access_token")
      );
    },
  });

  function handleReaction() {
    likePostMutation.mutate(id_post, {
      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey: ["postsList"],
        });
      },
      onSettled: () => {
        setIsLoading(false);
      },
    });
  }

  useEffect(() => {
    // console.log(
    //   contentHTML.current.childNodes,
    //   contentHTML.current.childNodes[0].children
    // );
    if (contentHTML.current.childNodes[0].clientHeight > 150) {
      setShowReadOptsButton(true);
    } else {
      setShowReadOptsButton(false);
    }
  }, [content]);

  /* ************ Render JSX ************ */
  return (
    <div className="post">
      <div className="post__container">
        <div className="post__header">
          <div className="avatar">
            <img src={avaURL} alt="avatar" />
          </div>
          <div className="general-info">
            <div className="username">
              <span>{username}</span>
              {isDoctor && (
                <img src={auth_tick} alt="tick" title="Chứng thực chuyên gia" />
              )}
            </div>
            <div className="privacy">
              {String(privacyIcon).toLowerCase() === "private" ? (
                <i className="fa-solid fa-lock"></i>
              ) : String(privacyIcon).toLowerCase() === "public" ? (
                <i className="fa-solid fa-earth-asia"></i>
              ) : (
                <i className="fa-solid fa-stethoscope"></i>
              )}
            </div>
          </div>
          <div className="show-func-menu">
            <div
              className="icon-show"
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <i className="fa-solid fa-ellipsis"></i>
            </div>
            {showMenu && (
              <div className="func-menu">
                <svg
                  viewBox="0 0 21 12"
                  width="20"
                  height="12"
                  fill="#fff"
                  style={{ transform: "scale(-1, -1) translate(0px, 0px)" }}
                >
                  <path d="M20.685.12c-2.229.424-4.278 1.914-6.181 3.403L5.4 10.94c-2.026 2.291-5.434.62-5.4-2.648V.12h20.684z"></path>
                </svg>
                <div className="func-menu__container">
                  <ul>
                    {menuItemsList.map((menu) => {
                      // console.log("menu", menu);
                      return (
                        <li
                          key={menu.label}
                          onClick={() => {
                            menu?.handleOnClick && menu.handleOnClick(id_post);
                          }}
                        >
                          <span className="icon">{menu.icon}</span>
                          <div className="explain-text">
                            <h4 className="label">{menu.label}</h4>
                            <p className="explain">{menu.explainText}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className={`post__body ${
            showReadOptsButton && (isReadLess ? "" : "read-more")
          }`}
          ref={contentHTML}
        >
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          {showReadOptsButton && (
            <>
              {isReadLess ? (
                <button
                  className="read-less-btn"
                  onClick={() => setIsReadLess(false)}
                >
                  Rút gọn
                </button>
              ) : (
                <button
                  className="read-more-btn"
                  onClick={() => setIsReadLess(true)}
                >
                  <span>Xem thêm</span>
                </button>
              )}
            </>
          )}
        </div>
        <footer className="post__footer">
          <div className="reaction">
            <span className="icon" onClick={handleReaction}>
              {isReact ? (
                <svg width="26" height="30" viewBox="0 0 26 30" fill="none">
                  <path
                    d="M24.1753 9.87992C23.615 9.3493 22.8748 9.06902 22.1031 9.1066L18.0594 9.27605C18.7596 8.31482 19.1464 7.15484 19.1464 5.95474C19.147 2.8137 16.5604 0.258057 13.3813 0.258057C11.4768 0.258057 9.7908 1.17916 8.74054 2.58883C7.87081 2.06841 6.85472 1.76265 5.76578 1.76265C2.58664 1.76265 0 4.31829 0 7.45933C0 10.1538 1.90645 12.4126 4.45505 13.0012C4.30676 13.3637 4.19265 13.744 4.12624 14.1414L3.77293 16.2786C3.40157 16.3818 3.04955 16.5576 2.74331 16.8073C2.09213 17.336 1.71948 18.1176 1.71948 18.9501V19.6642C1.71948 20.5407 2.16692 21.3274 2.85936 21.8084L2.03153 26.8184C1.9316 27.428 2.10567 28.0478 2.51056 28.5179C2.91545 28.988 3.50602 29.2581 4.13075 29.2581H19.7221C20.3243 29.2581 20.9013 29.0045 21.3037 28.5612C21.7066 28.1185 21.9007 27.5248 21.8362 26.933L21.0877 20.049C22.3662 19.4368 23.1231 18.0679 22.9187 16.648L22.6363 14.6924L23.0992 14.5434C24.2623 14.1682 25.0444 13.1031 25.0444 11.8941C25.0444 11.1272 24.7355 10.4125 24.1753 9.88183V9.87992ZM1.03221 7.45933C1.03221 4.88012 3.15593 2.78248 5.76578 2.78248C6.65937 2.78248 7.493 3.03346 8.20735 3.46025C7.83277 4.21509 7.61678 5.05912 7.61678 5.95537C7.61678 7.34148 8.11258 8.64032 9.00681 9.66143C7.32924 9.80921 5.84701 10.7239 4.95149 12.0623C2.72848 11.6794 1.03156 9.76335 1.03156 7.45933H1.03221ZM2.75169 18.9495C2.75169 18.4227 2.98766 17.9284 3.39964 17.5933C3.81162 17.2583 4.34738 17.1239 4.87219 17.2252C5.63425 17.3723 6.18743 18.0361 6.18743 18.8036V19.5171C6.18743 20.0439 5.95146 20.5382 5.53948 20.8732C5.1275 21.2083 4.59238 21.3427 4.06757 21.2421C3.30551 21.0943 2.75233 20.4305 2.75233 19.6636V18.9495H2.75169ZM20.5371 27.879C20.3269 28.1102 20.0374 28.2376 19.7228 28.2376H16.5656L17.0897 21.4026L20.0903 20.407L20.8111 27.0407C20.8453 27.3502 20.7473 27.6477 20.5371 27.879ZM21.8974 16.7901C22.0522 17.8634 21.41 18.8928 20.3701 19.2381L16.4366 20.5439L15.3561 20.9025C14.79 21.0911 14.1859 21.0006 13.7004 20.6567C13.2156 20.3114 12.9371 19.7757 12.9371 19.1846C12.9371 18.3705 13.4632 17.6545 14.2458 17.4016L21.6408 15.0129L21.8974 16.7901Z"
                    fill="#87A173"
                  />
                  <path
                    d="M6.17142 8.50442C6.14622 8.69149 6.03594 8.86334 5.86941 8.97582C5.70289 9.08829 5.50352 9.12531 5.32316 9.07681C5.12837 9.02464 4.92674 9.14156 4.87303 9.33845C4.81889 9.53512 4.93332 9.73742 5.12812 9.78959C5.51181 9.89273 5.92932 9.81897 6.27236 9.58788C6.49071 9.44069 6.66205 9.24078 6.77176 9.01284C6.83485 8.88177 6.87734 8.74187 6.89706 8.59649C6.92408 8.39443 6.78385 8.20981 6.58386 8.18414C6.38321 8.15871 6.19909 8.30212 6.17163 8.50398L6.17142 8.50442Z"
                    fill="#87A173"
                  />
                  <path
                    d="M5.63488 5.7675C5.46514 5.95023 5.44216 6.24471 5.58336 6.42488L5.98519 6.93734C6.12689 7.11766 6.37921 7.11537 6.54895 6.93264C6.60611 6.87103 6.64663 6.79727 6.66989 6.71903C6.71568 6.56496 6.69406 6.39478 6.60048 6.27526L6.19865 5.76281C6.05745 5.58263 5.80513 5.58493 5.63521 5.76826L5.63488 5.7675Z"
                    fill="#87A173"
                  />
                  <path
                    d="M3.33114 7.37974C3.1614 7.56247 3.13842 7.85695 3.27961 8.03712L3.68145 8.54957C3.82314 8.7299 4.07546 8.72761 4.24521 8.54488C4.30236 8.48327 4.34289 8.40951 4.36614 8.33127C4.41194 8.1772 4.39031 8.00702 4.29674 7.8875L3.8949 7.37505C3.75371 7.19487 3.50106 7.19641 3.33114 7.37974Z"
                    fill="#87A173"
                  />
                </svg>
              ) : (
                <svg width="26" height="30" viewBox="0 0 26 30" fill="none">
                  <path
                    d="M22.124 9.85349L22.1274 9.85333C22.7495 9.82303 23.3473 10.0438 23.8075 10.4679C23.8152 10.4762 23.8231 10.4843 23.8314 10.4922C24.2928 10.9291 24.5444 11.5129 24.5444 12.1414C24.5444 13.1302 23.9054 14.0053 22.9457 14.3148L22.483 14.4638C22.2509 14.5386 22.1066 14.7699 22.1414 15.0112L22.4238 16.9666C22.4238 16.9666 22.4238 16.9667 22.4238 16.9667C22.4238 16.9668 22.4238 16.9668 22.4238 16.9668C22.5962 18.165 21.9579 19.3253 20.8717 19.8453C20.6804 19.9369 20.5677 20.1394 20.5906 20.3503L21.3391 27.2344L21.3391 27.2345C21.388 27.683 21.2409 28.1346 20.9339 28.4719L20.9334 28.4725C20.6269 28.8102 20.1849 29.0054 19.7221 29.0054H4.13075C3.65064 29.0054 3.19872 28.798 2.88941 28.4389C2.58103 28.0808 2.44903 27.6102 2.52489 27.1469C2.52491 27.1468 2.52493 27.1467 2.52494 27.1466L3.35267 22.1372C3.38414 21.9467 3.30315 21.7551 3.14458 21.645C2.5776 21.2512 2.21948 20.6135 2.21948 19.9115V19.1975C2.21948 18.5163 2.52361 17.877 3.05847 17.4428L3.05927 17.4421C3.30886 17.2386 3.598 17.0934 3.9068 17.0076C4.09427 16.9555 4.2345 16.7994 4.26624 16.6074L4.61941 14.4711C4.61942 14.4711 4.61944 14.471 4.61945 14.4709C4.67904 14.1143 4.78194 13.77 4.91782 13.4379C4.97335 13.3021 4.96649 13.1489 4.89907 13.0186C4.83164 12.8884 4.71045 12.7944 4.56756 12.7614C2.23558 12.2228 0.5 10.158 0.5 7.70664C0.5 4.84741 2.85708 2.50996 5.76578 2.50996C6.75968 2.50996 7.6876 2.78877 8.4838 3.2652C8.704 3.39696 8.98819 3.34065 9.14149 3.13487C10.1017 1.84609 11.6417 1.00537 13.3813 1.00537C16.29 1.00537 18.647 3.34282 18.6464 6.20195V6.20205C18.6464 7.29428 18.2944 8.35157 17.6552 9.22897C17.5423 9.38409 17.528 9.59019 17.6186 9.75937C17.7092 9.92855 17.8886 10.031 18.0803 10.0229L22.124 9.85349ZM8.65524 3.92982C8.77128 3.69598 8.68789 3.41222 8.46379 3.27833C7.67615 2.80776 6.75448 2.5298 5.76578 2.5298C2.89458 2.5298 0.547002 4.83105 0.532275 7.67968C0.5318 7.68861 0.53156 7.6976 0.53156 7.70664C0.53156 10.2636 2.41332 12.3798 4.86663 12.8023C5.06119 12.8358 5.25725 12.7517 5.36704 12.5877C6.18044 11.372 7.5276 10.541 9.05069 10.4068C9.23826 10.3903 9.40064 10.2698 9.4708 10.0951C9.54097 9.92032 9.50701 9.72099 9.38296 9.57933C8.56823 8.64901 8.11678 7.4671 8.11678 6.20269C8.11678 5.38806 8.31287 4.61975 8.65524 3.92982ZM2.25169 19.1968C2.25169 19.2054 2.2519 19.214 2.25233 19.2224V19.9109C2.25233 20.9217 2.97958 21.7877 3.97238 21.9802L3.9734 21.9804C4.64257 22.1088 5.32781 21.9372 5.85496 21.5085C6.38275 21.0792 6.68743 20.4429 6.68743 19.7644V19.051C6.68743 18.0397 5.96031 17.1733 4.96698 16.9815L4.96693 16.9815C4.29749 16.8523 3.61139 17.024 3.08415 17.4527L3.39964 17.8407L3.08415 17.4527C2.55636 17.882 2.25169 18.5183 2.25169 19.1968ZM16.067 28.4467C16.0564 28.5855 16.1041 28.7225 16.1987 28.8247C16.2934 28.9268 16.4263 28.9849 16.5656 28.9849H19.7228C20.177 28.9849 20.6013 28.799 20.9071 28.4626C21.2124 28.1266 21.3582 27.6872 21.3081 27.2331L20.5874 20.6003C20.571 20.4501 20.4877 20.3153 20.3606 20.2336C20.2334 20.1519 20.0762 20.1321 19.9328 20.1797L16.9323 21.1753C16.7411 21.2388 16.6066 21.4108 16.5912 21.6117L16.067 28.4467ZM22.3923 16.9661L22.3923 16.9659L22.1357 15.1887C22.1147 15.0429 22.0304 14.9138 21.9054 14.8359C21.7804 14.7579 21.6273 14.7391 21.4872 14.7844L14.0922 17.1731L14.0921 17.1731C13.1063 17.4916 12.4371 18.3974 12.4371 19.4319C12.4371 20.1867 12.7954 20.8734 13.4104 21.3113L13.4113 21.312C14.0266 21.7479 14.7967 21.8632 15.5141 21.6242L16.5941 21.2658L16.5942 21.2658L20.5276 19.9599C21.7938 19.5395 22.5821 18.2827 22.3923 16.9661Z"
                    stroke="#87A173"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span className="number">
              {reactNum > 999
                ? `${
                    reactNum % 1000 > 99
                      ? (reactNum / 1000).toFixed(1)
                      : (reactNum / 1000).toFixed(0)
                  }K`
                : reactNum}
              {reactNum > 999 && (reactNum % 1000) % 100 !== 0 && (
                <i className="fa-solid fa-plus"></i>
              )}
            </span>
          </div>
          <div className="post-date">{date}</div>
          <div
            className="tag"
            style={{
              borderColor: tag.borderColor,
              color: tag.colorText,
              backgroundColor: tag.backgroundColor,
            }}
          >
            <i
              className="fa-solid fa-circle"
              style={{ color: tag.colorDisc }}
            ></i>
            {tag.tag}
          </div>
        </footer>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Post;
