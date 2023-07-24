// Import libraries
import { useEffect, useMemo, useState } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

// Import utilities
import PostService from "../../services/post.service";
import UserService from "../../services/user.service";
import { calcTime } from "../../utils/utils";

// Import redux utilities
import { userProfileSelector } from "../../redux/selectors/userSelector";

// Import components
import wall from "../../assets/images/avatarTest.png";
import ava from "../../assets/images/wallpaper.jpg";
import MessageComp from "../../components/MessageComp/Message";
import PostFrame from "../../components/PostFrame/PostFrame";
import CropperImage from "../../components/CropperImage/CropperImage";
import Post from "../../components/Post/Post";
import Loader from "../../components/Loader/Loader";

const token_test =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiNjRhOTgzOTU1YTEyZTgyMDliZTEzNDk1IiwiaWF0IjoxNjg4ODMyNTEwfQ.udvfx_bFvQFffxeVoMhwQKMhUjXOcoY_0TorTGBwyqU";

const Profile = () => {
  const userProfile = useSelector(userProfileSelector);

  const [myPostList, setMyPostList] = useState([]);

  const [showCropImageModal, setShowCropImageModal] = useState(false);
  const [imgSizeX, setImgSizeX] = useState(0);
  const [imgSizeY, setImgSizeY] = useState(0);
  const [shapeImage, setShapeImage] = useState("");
  const [usernameEdit, setUsernameEdit] = useState("");
  const [contentPost, setContentPost] = useState("");
  const [titleCropper, setTitleCropper] = useState("");
  const [file, setFile] = useState(undefined); // Image Origin
  const [photoURL, setPhotoURL] = useState(""); // Photo URL
  const [fieldCropper, setFieldCropper] = useState("");

  const [editUsername, setEditUsername] = useState(false);
  const [isReactUser, setIsReactUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useMemo(() => {
    setUsernameEdit(userProfile.name);
  }, [userProfile]);

  const myPostQuery = useQuery({
    queryKey: ["postsList", "my-posts"],
    queryFn: () => {
      setIsLoading(true);
      return PostService.getUserPosts(token_test);
    },
    refetchOnWindowFocus: false,
    staleTime: calcTime("10m"),
    cacheTime: calcTime("15m"),
  });

  function cancelEditName() {
    setUsernameEdit(userProfile.name);
    setEditUsername(false);
  }

  function cleanUpAfterUpload() {
    setPhotoURL("");
    setFile(null);
    setTitleCropper("");
    setFieldCropper("");
    setImgSizeX(0);
    setImgSizeY(0);
  }

  function openEditWallpaper(e) {
    // console.log([e.target]);
    setFieldCropper("wallpaper");
    setFile(e.target.files[0]);
    setPhotoURL(e.target.files[0] && URL.createObjectURL(e.target.files[0]));
    setImgSizeX(760);
    setImgSizeY(246);
    setShapeImage("");
    setTitleCropper("Cập nhật ảnh bìa");
    setShowCropImageModal(true);
  }

  function openEditAvatar(e) {
    // console.log([e.target]);
    setFieldCropper("avatar");
    setFile(e.target.files[0]);
    setPhotoURL(e.target.files[0] && URL.createObjectURL(e.target.files[0]));
    setImgSizeX(156);
    setImgSizeY(156);
    setShapeImage("");
    setTitleCropper("Cập nhật ảnh đại diện");
    setShowCropImageModal(true);
  }

  function saveCroppedImage(croppedImageFile) {
    const filesForm = new FormData();
    filesForm.append("originImage", file);
    filesForm.append("croppedImage", croppedImageFile);

    setIsLoading(true);

    UserService.uploadFile(filesForm, fieldCropper, token_test)
      .then((response) => {
        console.log("first", response);
        setFile(null);
        setPhotoURL(null);
        setShowCropImageModal(false);
      })
      .then(() => {
        cleanUpAfterUpload();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function deletePost(e) {
    console.log([e]);
    setIsLoading(true);
    PostService.deletePost(e, token_test)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .then(({ postDeleted }) => {
        // console.log(postDeleted, "vvvv");
        setMyPostList(
          (prev) => prev && prev.filter((post) => post._id !== postDeleted._id)
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (myPostQuery.isSuccess) {
      setMyPostList(myPostQuery.data.data.posts);
    } else if (myPostQuery.isError) {
      console.log(myPostQuery.error);
    }

    if (!myPostQuery.isLoading) setIsLoading(false);
  }, [myPostQuery.fetchStatus]);
  
  /* ************ Render JSX ************ */
  return (
    <div className="profile-page">
      <div className="profile-page__wrapper">
        <div className="avatar-setting">
          <div className="wallpaper-wrapper">
            <div
              className="wallpaper"
              style={{ backgroundImage: `url(${userProfile.wallpaper_url})` }}
            >
              {/* <div className="show-wallpaper__modal">
                <img src={userProfile.wallpaper_full_url} alt="wallpaper" />
              </div> */}
            </div>
            <div className="edit-wallpaper">
              <input
                type="file"
                id="wallpaper-file"
                accept="image/*"
                onChange={openEditWallpaper}
              />
              <label htmlFor="wallpaper-file" title="Chọn Ảnh">
                <i className="fa-solid fa-camera"></i>
                <span>Chỉnh sửa ảnh bìa</span>
              </label>
            </div>
          </div>
          <div className="avatar-wrapper">
            <div
              className="avatar"
              style={{ backgroundImage: `url(${userProfile.avatar_url})` }}
            ></div>
            <div className="edit-avatar">
              <input
                type="file"
                id="avatar-file"
                accept="image/*"
                onChange={openEditAvatar}
              />
              <label htmlFor="avatar-file" title="Chọn Ảnh">
                <i className="fa-solid fa-images"></i>
              </label>
            </div>
          </div>
          <div className="account-info">
            <div className="username">
              {editUsername ? (
                <span>
                  <input
                    autoFocus={true}
                    type="text"
                    value={usernameEdit}
                    onChange={(e) => setUsernameEdit(e.target.value)}
                  />
                  <button
                    className="cancel-btn"
                    onClick={cancelEditName}
                    style={{
                      paddingBottom: "6px",
                      borderBottom: "2px solid #87a173",
                    }}
                  >
                    <i
                      className="fa-solid fa-circle-xmark"
                      style={{
                        color: "#999",
                        fontSize: "1.8rem",
                      }}
                    ></i>
                  </button>
                </span>
              ) : (
                <h3>{usernameEdit}</h3>
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
            <p className="join-date">
              Tham gia EaseMe từ:
              <span style={{ marginLeft: "6px" }}>
                {userProfile.join_date
                  ? new Date(userProfile.join_date).getDate() +
                    "/" +
                    (new Date(userProfile.join_date).getMonth() + 1) +
                    "/" +
                    new Date(userProfile.join_date).getFullYear()
                  : <i className="fa-solid fa-infinity"></i> /
                    <i className="fa-solid fa-infinity"></i> /
                    <i className="fa-solid fa-infinity"></i>}
              </span>
            </p>
          </div>
        </div>
        <MessageComp content="Hôm nay cậu đã làm rất tốt, hãy thưởng cho mình một giấc ngủ ngon nhé!🥰" />
        <PostFrame
          avaURL={userProfile.avatar_url}
          contentPost={contentPost}
          setContentPost={setContentPost}
        />
        <div className="my-post">
          {myPostList &&
            myPostList.map((post) => {
              return (
                <Post
                  id_post={post._id}
                  key={post._id}
                  username={userProfile.name}
                  avaURL={userProfile.avatar_url}
                  privacyIcon={
                    String(post.privacy).toLowerCase() === "private" ? (
                      <i className="fa-solid fa-lock"></i>
                    ) : String(post.privacy).toLowerCase() === "public" ? (
                      <i className="fa-solid fa-earth-asia"></i>
                    ) : (
                      <i className="fa-solid fa-stethoscope"></i>
                    )
                  }
                  content={post.content}
                  tag={post.tag}
                  isReact={isReactUser}
                  isDoctor={userProfile.role === "psychologists"}
                  changeReactFunc={setIsReactUser}
                  date={new Date().toLocaleString()}
                  menuItemsList={[
                    {
                      icon: (
                        <i className="fa-solid fa-triangle-exclamation"></i>
                      ),
                      label: "Báo cáo bài viết",
                      explainText:
                        "Chúng tôi sẽ bảo mật danh tính người báo cáo",
                    },
                    {
                      icon: <i className="fa-solid fa-pen"></i>,
                      label: "Chỉnh sửa bài viết",
                      explainText:
                        "Bạn có thể chỉnh nội dung và chủ đề, hoặc quyền riêng tư",
                    },
                    {
                      icon: <i className="fa-regular fa-trash-can"></i>,
                      label: "Xóa bài viết",
                      explainText:
                        "Các bài viết bị xóa không thể khôi phục lại",
                      handleOnClick: deletePost,
                    },
                  ]}
                />
              );
            })}
        </div>
      </div>

      {showCropImageModal && (
        <CropperImage
          imgSizeX={imgSizeX}
          imgSizeY={imgSizeY}
          maxvalZoom={5}
          cropShape={shapeImage}
          imageURL={photoURL}
          closeCropModalFunc={() => {
            setShowCropImageModal(false);
          }}
          saveCroppedImgFunc={saveCroppedImage}
          title={titleCropper}
        />
      )}

      {isLoading && <Loader />}
    </div>
  );
};

export default Profile;
