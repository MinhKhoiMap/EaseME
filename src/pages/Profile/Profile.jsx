// Import libraries
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";

// Import utilities
import PostService from "../../services/post.service";
import UserService from "../../services/user.service";
import { calcTime } from "../../utils/utils";

// Import redux utilities
import { updateUser } from "../../redux/slices/userSlice";
import { userProfileSelector } from "../../redux/selectors/userSelector";
import { getMyPostList } from "../../redux/selectors/postSelector";
import {
  retrievePostsList,
  removePost,
} from "../../redux/slices/postsListSlice";

// Import styles
import "./Profile.css";

// Import images
import wall from "../../assets/images/avatarTest.png";
import ava from "../../assets/images/wallpaper.jpg";

// Import components
import MessageComp from "../../components/MessageComp/Message";
import PostFrame from "../../components/PostFrame/PostFrame";
import CropperImage from "../../components/CropperImage/CropperImage";
import Post from "../../components/Post/Post";
import Loader from "../../components/Loader/Loader";

const token_test =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiNjRhNmQ2Y2ZhMzkyMmQ1ZDQ3Y2NkNDY4IiwiaWF0IjoxNjkwNzY4NDc5fQ.nk0gDmaSiKEqROe90V0ceiA7Ioef7dqXviHWy4S9gEo";

/* Functional Component */
const Profile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector(userProfileSelector);
  const myPostList = useSelector(getMyPostList);

  // const [myPostList, setMyPostList] = useState([]);

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

  const [isEditMode, setIsEditMode] = useState(false);
  const [isReactUser, setIsReactUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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

  const updateProfileMutation = useMutation({
    mutationFn: (data) => {
      setIsLoading(true);
      return UserService.updateProfile(data, token_test);
    },
  });

  const updateImageMutation = useMutation({
    mutationFn: ({ filesForm, fieldCropper }) => {
      setIsLoading(true);
      return UserService.uploadFile(filesForm, fieldCropper, token_test);
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: (postID) => {
      setIsLoading(true);
      return PostService.deletePost(postID, token_test);
    },
  });

  function updateProfile(data) {
    updateProfileMutation.mutate(data, {
      onSuccess: (response) => {
        // console.log(response, "mutation updated");
        dispatch(updateUser(response.data.profile));
        setIsEditMode(false);
      },
      onSettled: () => {
        setIsLoading(false);
      },
    });
  }

  function cancelEditName() {
    setUsernameEdit(userProfile.name);
    setIsEditMode(false);
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
    updateImageMutation.mutate(
      { filesForm, fieldCropper },
      {
        onSettled: () => setIsLoading(false),
        onSuccess: (response) => {
          // console.log(response);
          dispatch(updateUser(response.data.profile));
          cleanUpAfterUpload();
          setShowCropImageModal(false);
        },
      }
    );
  }

  function deletePost(id_post) {
    // console.log(id_post);
    deletePostMutation.mutate(id_post, {
      onSettled: () => setIsLoading(false),
      onSuccess: () => {
        dispatch(removePost(id_post));
      },
    });
  }

  useEffect(() => {
    if (myPostQuery.isSuccess) {
      console.log(myPostQuery.data.data.posts, ":v");
      dispatch(retrievePostsList(myPostQuery.data.data.posts));
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
              {isEditMode ? (
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
                <h3>{userProfile?.name}</h3>
              )}
              {isEditMode ? (
                <button
                  className="update-name-btn"
                  onClick={() => {
                    updateProfile({ name: usernameEdit });
                  }}
                >
                  <i className="fa-solid fa-check"></i>
                </button>
              ) : (
                <button
                  className="change-name-btn"
                  onClick={() => setIsEditMode((prev) => !prev)}
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
              )}
            </div>
            <p className="join-date">
              Tham gia EaseMe từ:
              <span style={{ marginLeft: "6px" }}>{userProfile.join_date}</span>
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
                  privacyIcon={post.privacy}
                  content={post.content}
                  tag={post.tag}
                  isReact={isReactUser}
                  reactNum={post.reaction_number}
                  isDoctor={userProfile.role === "psychologists"}
                  changeReactFunc={setIsReactUser}
                  date={post.postDate}
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
