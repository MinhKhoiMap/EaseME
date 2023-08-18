// Import libraries
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

// Import services
import UserServices from "../../services/user.service";

// Import styles
import "./Register.css";

// Import images
import logo from "../../assets/images/logo-original.svg";
import grid from "../../assets/images/backgrounds/GridBg.png";
import wallpaper from "../../assets/images/wallpaper.jpg";

// Import components
import InputGroup from "../../components/InputGroup/InputGroup";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import CropperImage from "../../components/CropperImage/CropperImage";

const Register = () => {
  const navigate = useNavigate();
  const registerFormRef = useRef(null);

  const [usernameInp, setUsernameInp] = useState("");
  const [nameInp, setNameInp] = useState("");
  const [passwordInp, setPasswordInp] = useState("");
  const [confPasswordInp, setConfPasswordInp] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarCropFile, setAvatarCropFile] = useState(null);
  const [photoBlob, setPhotoBlob] = useState("");
  const [photoCropBlob, setPhotoCropBlob] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isShowCropper, setIsShowCropper] = useState(false);
  const [isDisabledCreateButton, setIsDisabledCreateButton] = useState(true);

  const usersMutation = useMutation({
    mutationFn: (body) => {
      setIsLoading(true);
      return UserServices.createUser(body);
    },
  });

  function closeCropper() {
    setAvatarFile(null);
    setIsShowCropper(false);
  }

  function openCropperImage(e) {
    setAvatarFile(e.target.files[0]);
    setPhotoBlob(e.target.files[0] && URL.createObjectURL(e.target.files[0]));
    setIsShowCropper(true);
  }

  function saveImage(croppedImageFile) {
    setPhotoCropBlob(croppedImageFile.blob);
    setAvatarCropFile(croppedImageFile.croppedFile);
    setIsShowCropper(false);
  }

  function createAccount(e) {
    e.preventDefault();
    const registerFormData = new FormData(registerFormRef.current);
    if (passwordInp === confPasswordInp) {
      registerFormData.append("originImage", avatarFile);
      registerFormData.append("croppedImage", avatarCropFile);
    }
    console.log(avatarFile);
    console.log(...registerFormData);
    usersMutation.mutate(registerFormData, {
      onSettled: () => {
        setIsLoading(false);
      },
      onSuccess: () => {
        navigate("/login");
      },
    });
  }

  useEffect(() => {
    if (
      passwordInp === confPasswordInp &&
      usernameInp &&
      nameInp &&
      avatarFile
    ) {
      setIsDisabledCreateButton(false);
    } else {
      setIsDisabledCreateButton(true);
    }
  }, [passwordInp, confPasswordInp, usernameInp, nameInp, avatarFile]);

  return (
    <div className="register">
      <div
        className="register-page__wrapper"
        style={{ backgroundImage: `url(${grid})` }}
      >
        <div className="logo__wrapper">
          <Link to="/">
            <figure className="logo">
              <img src={logo} alt="EaseMe" title="EaseMe" />
            </figure>
          </Link>
        </div>
        <div className="register-page__header">
          <h2 className="register-page__header-title">Tạo tài khoản</h2>
        </div>
        <div className="register-page__main">
          <div className="register-page__register-section">
            <form
              id="form-register"
              ref={registerFormRef}
              onSubmit={createAccount}
            >
              <div className="register-page__field-group">
                <div className="left-section">
                  <div
                    className="register-page__field-input"
                    title="Tên này sẽ được hiển thị"
                  >
                    <InputGroup
                      text="Tên tài khoản"
                      placeholderText="Nhập tên tài khoản"
                      required={true}
                      target="register-name"
                      borderRadius={15}
                      value={nameInp}
                      setValue={setNameInp}
                      nameField="name"
                    />
                  </div>
                  <div className="register-page__field-input">
                    <InputGroup
                      text="Tên đăng nhập"
                      placeholderText="Nhập tên đăng nhập"
                      required={true}
                      target="register-username"
                      borderRadius={15}
                      value={usernameInp}
                      setValue={setUsernameInp}
                      nameField="username"
                    />
                  </div>
                </div>
                <div className="right-section">
                  <div className="register-page__field-input">
                    <InputGroup
                      text="Mật khẩu"
                      type="password"
                      placeholderText="Nhập mật khẩu"
                      required={true}
                      target="register-password"
                      borderRadius={15}
                      value={passwordInp}
                      setValue={setPasswordInp}
                      nameField="password"
                    />
                  </div>
                  <div className="register-page__field-input">
                    <InputGroup
                      text="Nhập lại mật khẩu"
                      type="password"
                      placeholderText="Nhập lại mật khẩu"
                      required={true}
                      target="register-confpassword"
                      borderRadius={15}
                      value={confPasswordInp}
                      nameField="confpassword"
                      setValue={setConfPasswordInp}
                    />
                  </div>
                  <div className="register-page__upload-avatar">
                    <label
                      htmlFor="register__upload-avatar"
                      style={{ backgroundImage: `url(${photoCropBlob})` }}
                    >
                      {!photoCropBlob && <i className="fa-solid fa-image"></i>}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      id="register__upload-avatar"
                      onChange={openCropperImage}
                    />
                  </div>
                </div>
              </div>
              <div className="register-page__register-btn-wrap">
                <Button
                  text="Tạo tài khoản"
                  borderWidth={2}
                  props={{ disabled: isDisabledCreateButton }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {isShowCropper && (
        <CropperImage
          imageURL={photoBlob}
          imgSizeX={156}
          imgSizeY={156}
          maxvalZoom={4}
          stepZoom={0.5}
          cropShape="round"
          closeCropModalFunc={closeCropper}
          saveCroppedImgFunc={saveImage}
          title="Chọn ảnh đại diện"
        />
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default Register;
