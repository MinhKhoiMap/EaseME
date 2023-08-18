// Import libraries
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Import redux utilities
import { userAvatarSelector } from "../../redux/selectors/userSelector";

// Import components
import {
  AccountIconDefault,
  BookIcon,
  CaretDownIcon,
  HeartIcon,
} from "../Icons/Icons";

// Import styles
import "./TopNavBar.css";

// Import images
import logo from "../../assets/images/logo-original.svg";

const TopNavBar = () => {
  const userAvatar = useSelector(userAvatarSelector);

  const [showMenu, setShowMenu] = useState(false);

  const topNavRef = useRef();

  function handleManageAccountMenu() {
    setShowMenu(false);
  }

  function handleLogout() {
    localStorage.removeItem("access_token");
    window.location.reload();
  }

  useEffect(() => {
    window.addEventListener("click", handleManageAccountMenu);

    return () => {
      window.removeEventListener("click", handleManageAccountMenu);
    };
  });

  return (
    <div className="top-nav" ref={topNavRef}>
      <div className="top-nav__container">
        <Link to="/">
          <figure className="logo">
            <img src={logo} alt="EaseMe" title="EaseMe" />
          </figure>
        </Link>
        <ul className="navigate-list">
          {/* <Link to="">
            <li>
              <i
                className="fa-solid fa-house"
                style={{ fontSize: 24, color: "#87A173" }}
              ></i>
              <span className="underline">Trang chủ</span>
            </li>
          </Link> */}
          <Link to="/community">
            <li>
              <i
                className="fa-solid fa-globe"
                style={{ fontSize: 24, color: "#87A173" }}
              ></i>
              <span className="underline">Cộng đồng</span>
            </li>
          </Link>
        </ul>
        {localStorage.getItem("access_token") && (
          <ul className="feature-list">
            <Link to="">
              <li>
                <HeartIcon w={26} h={26} />
                <span>Kết nối</span>
              </li>
            </Link>

            <Link to="/my-book">
              <li>
                <BookIcon color="#87A173" border="#87A173" />
                <span>Nhật ký</span>
              </li>
            </Link>
          </ul>
        )}
        {localStorage.getItem("access_token") && (
          <div className="account-manage">
            <span className="avatar">
              <Link to="/profile">
                {userAvatar ? (
                  <img src={userAvatar} alt="user avatar" />
                ) : (
                  <AccountIconDefault color="#87A273" />
                )}
              </Link>
            </span>
            <span
              className={`show-menu ${showMenu && "show"}`}
              onClick={(e) => {
                setShowMenu((prev) => !prev);
                e.stopPropagation();
              }}
            >
              <CaretDownIcon color="#87A173" />
            </span>

            <ul
              className={`menu ${showMenu && "show"}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Link
                to="/profile"
                onClick={(e) => {
                  setShowMenu(false);
                }}
              >
                <li>Trang cá nhân</li>
              </Link>
              {/* <Link to="/survey" onClick={() => setShowMenu(false)}>
                <li>Làm khảo sát</li>
              </Link> */}
              <li onClick={handleLogout}>Đăng xuất</li>
            </ul>
          </div>
        )}
        {!localStorage.getItem("access_token") && (
          <Link to="/login">
            <button className="sign-in__btn btn">Đăng nhập ngay!</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TopNavBar;
