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
              <HomeIcon
                className="navigate-list__item-icon"
                w={36}
                h={36}
                color="#87A173"
              />
              <span>Home</span>
            </li>
          </Link> */}
        </ul>
        <ul className="feature-list">
          <Link to="">
            <li>
              <HeartIcon w={26} h={26} />
              <span>Kết nối</span>
            </li>
          </Link>
          <Link to="/book">
            <li>
              <BookIcon color="#87A173" border="#87A173" />
              <span>Nhật ký</span>
            </li>
          </Link>
        </ul>
        <div className="account-manage">
          <span className="avatar">
            <Link to="/page/profile">
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
              to="/page/profile"
              onClick={(e) => {
                setShowMenu(false);
              }}
            >
              <li>Trang cá nhân</li>
            </Link>
            <Link to="/survey" onClick={() => setShowMenu(false)}>
              <li>Làm khảo sát</li>
            </Link>
            <li>Đăng xuất</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
