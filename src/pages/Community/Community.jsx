// Import libraries
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

// Import redux utilities
import { userAvatarSelector } from "../../redux/selectors/userSelector";

// Import utilities
import PostService from "../../services/post.service";
import { calcTime } from "../../utils/utils";

// Import styles
import "./Community.css";

// Import components
import MessageComp from "../../components/MessageComp/Message";
import PostFrame from "../../components/PostFrame/PostFrame";
import Post from "../../components/Post/Post";
import FilterPost from "../../components/FilterPost/FilterPost";

// const token_test =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiNjRhNmQ2Y2ZhMzkyMmQ1ZDQ3Y2NkNDY4IiwiaWF0IjoxNjkwNzY4NDc5fQ.nk0gDmaSiKEqROe90V0ceiA7Ioef7dqXviHWy4S9gEo";

const authorItemList = [
  { tag: "Tất cả", slug: "all" },
  { tag: "Chuyên gia", slug: "psychologists" },
  { tag: "Người dùng", slug: "clients" },
];

const Community = () => {
  const userAvatar = useSelector(userAvatarSelector);
  const { id_tag } = useParams();

  // console.log(id_tag, "v");

  const [author, setAuthor] = useState({ tag: "Tất cả", slug: "all" });
  const [contentPost, setContentPost] = useState("");

  const newsfeedQuery = useQuery({
    queryKey: ["postsList", id_tag || "all"],
    queryFn: () => {
      return id_tag
        ? PostService.getAllPostsWithTag(
            id_tag,
            localStorage.getItem("access_token")
          )
        : PostService.getAllPosts(localStorage.getItem("access_token"));
    },
    staleTime: calcTime("10m"),
    cacheTime: calcTime("15m"),
  });

  /* ************ Render JSX ************ */
  return (
    <div className="community">
      <div className="community__container">
        <div className="community__header">
          <MessageComp content="Nếu cậu thấy không vui, cứ dùng nơi này để viết gì đó cho bản thân, dù chỉ là một câu chào cũng được" />
        </div>
        <div className="community__body">
          {userAvatar && (
            <div className="community__post-story">
              <PostFrame
                contentPost={contentPost}
                setContentPost={setContentPost}
                avaURL={userAvatar}
              />
            </div>
          )}
          <div className="community__filter-section">
            <FilterPost
              author={author}
              setAuthor={setAuthor}
              authorItemList={authorItemList}
            />
          </div>
          <div className="community__newsfeed">
            {newsfeedQuery.data &&
              newsfeedQuery.data.data.posts.map((post) => {
                if (post.user.role === author.slug || author.slug === "all")
                  return (
                    <Post
                      key={post._id}
                      id_post={post._id}
                      privacyIcon={post.privacy}
                      content={post.content}
                      date={post.postDate}
                      tag={post.tag}
                      avaURL={post.user.avatar_url}
                      reactNum={post.reaction_number}
                      username={post.user?.name}
                      isDoctor={
                        String(post.user.role).toLowerCase() === "psychologists"
                      }
                      isReact={post.isReacted}
                      menuItemsList={[
                        {
                          icon: (
                            <i className="fa-solid fa-triangle-exclamation"></i>
                          ),
                          label: "Báo cáo bài viết",
                          explainText:
                            "Chúng tôi sẽ bảo mật danh tính người báo cáo",
                        },
                      ]}
                    />
                  );
                return null;
              })}
            {newsfeedQuery.data && newsfeedQuery.data.data.posts.length < 1 && (
              <h3>Không tìm thấy bài viết phù hợp.</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
