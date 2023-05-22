import "./Login.css";
import InputGroup from "../../components/InputGroup/InputGroup";
import Button from "../../components/Button/Button";

import grid from "../../assets/images/backgrounds/GridBg.png";

// import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div
      className="login-page__wrapper"
      style={{ backgroundImage: `url(${grid})` }}
    >
      <div className="login-page__header">
        <h2 className="login-page__header-title">Đăng nhập</h2>
      </div>
      <div className="login-page__main">
        <div className="login-page__login-section">
          <form id="form-login">
            <div className="login-page__login-feature">
              <InputGroup
                text="Tên người dùng"
                placeholderText="Nhập username"
                required={true}
                target="login-username"
                borderRadius={15}
              />
            </div>
            <div className="login-page__login-feature">
              <InputGroup
                text="Mật khẩu"
                placeholderText="Mật khẩu"
                required={true}
                target="login-password"
                borderRadius={15}
              />
            </div>
            <a href="/" className="login-page__forget-password">
              Bạn quên mật khẩu?
            </a>
            <div className="login-page__login-btn-wrap">
              <Button text="Đăng nhập" borderWidth={2} />
            </div>
          </form>
          <div className="separate-section">hoặc</div>
          <div className="login-page__login-options">
            <a
              href="https://www.facebook.com/khoimapp/"
              className="login-page__options-btn"
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
                  <rect width="35.2727" height="22.718" fill="#87A273" />
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
            </a>
          </div>
        </div>
      </div>
      <div className="login-page__register-navigate">
        <span>Chưa có tài khoản?</span>
        <a href="/register">Tạo tài khoản</a>
      </div>
    </div>
  );
};

export default Login;
