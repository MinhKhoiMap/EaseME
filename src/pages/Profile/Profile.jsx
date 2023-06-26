import { useState } from "react";
import "./Profile.css";

import wall from "../../assets/images/avatarTest.png";
import ava from "../../assets/images/wallpaper.jpg";
import PostFrame from "../../components/PostFrame/PostFrame";
import CropperImage from "../../components/CropperImage/CropperImage";

const Profile = () => {
  let name = "Chiến thần thất nghiệp";

  const [showCropImageModal, setShowCropImageModal] = useState(false);
  const [imgSizeX, setImgSizeX] = useState(0);
  const [imgSizeY, setImgSizeY] = useState(0);
  const [shapeImage, setShapeImage] = useState("");
  const [src, setSrc] = useState(null);
  const [username, setUsername] = useState(name);
  const [titleCropper, setTitleCropper] = useState("");

  const [editUsername, setEditUsername] = useState(false);

  function cancelEditName() {
    setUsername(name);
    setEditUsername(false);
  }

  let date = "10/05/2023";
  return (
    <div className="profile-page">
      <div className="profile-page__wrapper">
        <div className="avatar-setting">
          <div
            className="wallpaper"
            style={{ backgroundImage: `url(${ava})` }}
            onClick={() => {
              setSrc(ava);
              setImgSizeX(760);
              setImgSizeY(246);
              setShapeImage("");
              setTitleCropper("Cập nhật ảnh bìa");
              setShowCropImageModal(true);
            }}
          ></div>
          <div
            className="avatar"
            style={{ backgroundImage: `url(${wall})` }}
            onClick={() => {
              setSrc(wall);
              setImgSizeX(153);
              setImgSizeY(153);
              setShapeImage("round");
              setTitleCropper("Cập nhật ảnh đại diện");
              setShowCropImageModal(true);
            }}
          ></div>
          <div className="account-info">
            <div className="username">
              {editUsername ? (
                <span>
                  <input
                    autoFocus={true}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <button className="cancel-btn" onClick={cancelEditName}>
                    <i
                      className="fa-solid fa-circle-xmark"
                      style={{
                        color: "#999",
                        fontSize: "2rem",
                      }}
                    ></i>
                  </button>
                </span>
              ) : (
                <h3>{username}</h3>
              )}
              <button
                className="change-name-btn"
                onClick={() => setEditUsername((prev) => !prev)}
              >
                {!editUsername ? (
                  <i className="fa-regular fa-pen-to-square"></i>
                ) : (
                  <i className="fa-solid fa-check"></i>
                )}
              </button>
            </div>
            <p className="join-date">Tham gia EaseMe: {date}</p>
          </div>
        </div>
        <div className="motivational-speech">
          Hôm nay cậu đã làm rất tốt, hãy thưởng cho mình một giấc ngủ ngon nhé!
        </div>
        <PostFrame />
      </div>

      {showCropImageModal && (
        <CropperImage
          imgSizeX={imgSizeX}
          imgSizeY={imgSizeY}
          maxvalZoom={5}
          cropShape={shapeImage}
          file={src}
          closeCropModalFunc={() => setShowCropImageModal(false)}
          title={titleCropper}
        />
      )}
    </div>
  );
};

export default Profile;
