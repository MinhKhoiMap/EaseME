// Import libraries
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

// Import utilities
import UserService from "../../services/user.service";

// Import redux utilities
import { retrieveUser } from "../../redux/slices/userSlice";

// Import CSS
import "./Login.css";

// Import components
import Loader from "../../components/Loader/Loader";
import InputGroup from "../../components/InputGroup/InputGroup";
import Button from "../../components/Button/Button";

// Import Images
import grid from "../../assets/images/backgrounds/GridBg.png";
import logo from "../../assets/images/logo-original.svg";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [usernameInp, setUsernameInp] = useState("");
  const [passwordInp, setPasswordInp] = useState("");
  const [errorText, setErrorText] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [googleHoverColor, setGoogleHoverColor] = useState("#87A273");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isUsernameError, setIsUsernameError] = useState(false);

  const loginMutation = useMutation({
    mutationFn: ({ username, password }) => {
      setIsLoading(true);
      return UserService.login(username, password);
    },
  });

  function handleLogin(e) {
    e.preventDefault();
    loginMutation.mutate(
      { username: usernameInp, password: passwordInp },
      {
        onSuccess: (response) => {
          // console.log(response, "token");
          localStorage.setItem("access_token", response.data.access_token);
          dispatch(retrieveUser(response.data.user_profile));
          navigate("/profile");
        },
        onError: (err) => {
          if (err.response.status === 401) {
            setIsPasswordError(true);
            setErrorText("Sai mật khẩu");
          } else if (err.response.status === 404) {
            setIsUsernameError(true);
            setErrorText("Tên đăng nhập không tồn tại.");
          }
        },
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  }

  return (
    <div
      className="login-page__wrapper"
      style={{ backgroundImage: `url(${grid})` }}
    >
      <div className="logo__wrapper">
        <Link to="/">
          <figure className="logo">
            <img src={logo} alt="EaseMe" title="EaseMe" />
          </figure>
        </Link>
      </div>
      <div className="login-page__header">
        <h2 className="login-page__header-title">Đăng nhập</h2>
      </div>
      <div className="login-page__main">
        <div className="login-page__login-section">
          <form id="form-login" onSubmit={handleLogin}>
            <div
              className={`login-page__login-feature ${
                isUsernameError && "login-page__login-feature--error"
              }`}
            >
              <InputGroup
                text="Tên đăng nhập"
                placeholderText="Nhập tên đăng nhập"
                required={true}
                target="login-username"
                borderRadius={15}
                value={usernameInp}
                setValue={setUsernameInp}
              />
            </div>
            <div
              className={`login-page__login-feature login-page__login-feature--password login-page__login-feature ${
                isPasswordError && "login-page__login-feature--error"
              }`}
            >
              <InputGroup
                text="Mật khẩu"
                placeholderText="Nhập mật khẩu"
                required={true}
                target="login-password"
                borderRadius={15}
                type={!showPassword ? "password" : "text"}
                value={passwordInp}
                setValue={setPasswordInp}
              />
              <span
                className="login-page__show-password"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
              >
                <svg width="24" height="21" viewBox="0 0 24 21" fill="none">
                  <path
                    d="M22.3317 8.13407C21.5041 6.77898 20.4603 5.56855 19.2416 4.55082L21.8083 1.98415C21.9752 1.81126 22.0676 1.57971 22.0655 1.33937C22.0635 1.09902 21.967 0.869107 21.7971 0.69915C21.6271 0.529192 21.3972 0.432787 21.1569 0.430699C20.9165 0.42861 20.685 0.521005 20.5121 0.687983L17.7208 3.4829C15.9905 2.45515 14.0124 1.91949 11.9999 1.93373C6.32484 1.93373 3.09084 5.81857 1.66817 8.13407C1.22866 8.84495 0.99585 9.6642 0.99585 10.5C0.99585 11.3358 1.22866 12.155 1.66817 12.8659C2.4957 14.221 3.53954 15.4314 4.75826 16.4492L2.19159 19.0158C2.10404 19.1004 2.03421 19.2015 1.98617 19.3134C1.93812 19.4252 1.91284 19.5455 1.91178 19.6672C1.91072 19.7889 1.93391 19.9096 1.98001 20.0223C2.0261 20.1349 2.09416 20.2373 2.18023 20.3233C2.2663 20.4094 2.36865 20.4775 2.4813 20.5236C2.59396 20.5697 2.71466 20.5929 2.83638 20.5918C2.95809 20.5907 3.07838 20.5655 3.19021 20.5174C3.30205 20.4694 3.4032 20.3995 3.48776 20.312L6.28542 17.5143C8.01359 18.5419 9.98937 19.0785 11.9999 19.0662C17.675 19.0662 20.909 15.1814 22.3317 12.8659C22.7712 12.155 23.004 11.3358 23.004 10.5C23.004 9.6642 22.7712 8.84495 22.3317 8.13407ZM3.23018 11.9061C2.96905 11.4836 2.83074 10.9967 2.83074 10.5C2.83074 10.0033 2.96905 9.51636 3.23018 9.09382C4.45301 7.10832 7.21676 3.76707 11.9999 3.76707C13.5218 3.75854 15.0224 4.12533 16.3688 4.83498L14.5235 6.68023C13.6434 6.09595 12.5883 5.83415 11.5372 5.93924C10.4861 6.04434 9.50372 6.50986 8.75676 7.25682C8.0098 8.00378 7.54428 8.98616 7.43918 10.0373C7.33409 11.0884 7.59589 12.1435 8.18017 13.0236L6.06267 15.1411C4.93985 14.2333 3.98169 13.139 3.23018 11.9061ZM14.7499 10.5C14.7499 11.2293 14.4602 11.9288 13.9445 12.4445C13.4287 12.9603 12.7293 13.25 11.9999 13.25C11.5916 13.2484 11.1889 13.1544 10.822 12.975L14.4749 9.32207C14.6543 9.68891 14.7483 10.0916 14.7499 10.5ZM9.24992 10.5C9.24992 9.77064 9.53966 9.07116 10.0554 8.55544C10.5711 8.03971 11.2706 7.74998 11.9999 7.74998C12.4083 7.75156 12.811 7.84558 13.1778 8.02498L9.52493 11.6779C9.34552 11.3111 9.25151 10.9083 9.24992 10.5ZM20.7697 11.9061C19.5468 13.8916 16.7831 17.2329 11.9999 17.2329C10.478 17.2414 8.97746 16.8746 7.63109 16.165L9.47634 14.3197C10.3564 14.904 11.4115 15.1658 12.4626 15.0607C13.5137 14.9556 14.4961 14.4901 15.2431 13.7431C15.99 12.9962 16.4556 12.0138 16.5607 10.9627C16.6658 9.91157 16.404 8.85646 15.8197 7.9764L17.9372 5.8589C19.06 6.76666 20.0182 7.86094 20.7697 9.09382C21.0308 9.51636 21.1691 10.0033 21.1691 10.5C21.1691 10.9967 21.0308 11.4836 20.7697 11.9061Z"
                    fill="#87A273"
                  />
                </svg>
              </span>
            </div>
            {errorText && (
              <div className="error-label">
                <i className="fa-solid fa-circle-exclamation"></i>
                {errorText}
              </div>
            )}
            <a href="/" className="login-page__forget-password">
              Bạn quên mật khẩu?
            </a>
            <div className="login-page__login-btn-wrap">
              <Button text="Đăng nhập" borderWidth={2} />
            </div>
          </form>
          <div className="separate-section">hoặc</div>
          <div className="login-page__login-options">
            {/* <a
              href="https://www.facebook.com/khoimapp/"
              className="login-page__options-btn"
              onMouseEnter={() => setGoogleHoverColor("#fff")}
              onMouseLeave={() => setGoogleHoverColor("#87A273")}
            >
              <svg width="36" height="23" viewBox="0 0 36 23" fill="none">
                <mask
                  id="mask0_113_284"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="36"
                  height="23"
                >
                  <rect width="35.2727" height="22.718" fill="url(#pattern0)" />
                </mask>
                <g mask="url(#mask0_113_284)">
                  <rect
                    width="35.2727"
                    height="22.718"
                    fill={googleHoverColor}
                  />
                </g>
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_113_284"
                      transform="scale(0.0169492 0.0263158)"
                    />
                  </pattern>
                  <image
                    id="image0_113_284"
                    width="59"
                    height="38"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAAmCAYAAAB6beP2AAAACXBIWXMAAAsSAAALEgHS3X78AAAC90lEQVRogd2a4XXaMBDHf8fL92SDeoOwQT0CmSB0gtIN6AZ0A2eCpBPUTFBnA7IBLHDXDxYlMbYlGcv09feeHu9hS6c/Okl3EmJmDMXMMiAD8sajHbATkXJw4wmQWLFmtgCO5TagyhYogBcR2cd2cEyCxZrZElgDnwbaOgAbYHMt0V6xZpZTj8xQkU0OwFJEXkZqL5hZ30MzWwO/GE8o1K7/bGabEdsMonNkzawAHhPb/yYik4luFTuR0CcRWSa28YEzNzazFf+hUGiMrJnNgd8R9Q9ACVTuE+p9d069NbXN9asIhXOxFXAfUC9oG3F78oaT6FGFukVu3vh60dknM8PMUNWlqlpAKVX17ljPV1T1TlULVS1C60S0Xbb0L+96/+ad7nXAjxk9Mu5XjqqTihn8dTffXrq91lwbi+NqvPC8d+AfGZ1LCBVbiMgucV+Sc+PSNF/2UoQ0ZmYvwN0F/amAdXM1dfF5G2225h1R4V5UNaeOf7t4E5HM2826U8OT4xM/ReSDp43U7nbGeeLdpBzBUAyXeEYvvVmPY5fKeAfNIGE0QsROTcjpxyBu/K+QpTIewXdq926OesZ5fPAKtIWLFaq68ISHVUT4FhJuesPRCHvrmHBxhn9O3ptZskVjSmYiUlFHSH2sQhqTAKhdso8qxNYQjgtU6XlvNeLoLj3Pk4v1nfTdUuelFxGYcJSX2uliBiAiBX5XfnRnx4NwnlF4XntNGoN7Vra2shmQZGeqWgW0vRw7wX9fmicKu0DBVd8S3xC6UtV9QJu7lELN7OwMagE8RzjGK/V8L4G9iFQuQ7mjjrlD5uiRL246JePs3NjqQ6yvKY22sBWRPLWRrkPyEvic2rjjDZhPcdnVlQgsqK8aU3Og7+hzZFrFisjeudVTQtsHIHcR3CT0pnjuNPEB/x4cyxbIphQKAfmsu0fNgB9cLvoNeBCR/BoX0lF/M3BR0NKVkGsSON0HFde4gH5P9H8qjjjhOaeEOnefO1f2QDm1q/bxBz0fDozgtYUoAAAAAElFTkSuQmCC"
                  />
                </defs>
              </svg>
            </a> */}
          </div>
        </div>
      </div>
      <div className="login-page__register-navigate">
        <span>Chưa có tài khoản?</span>
        <a href="/register">Tạo tài khoản</a>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Login;
