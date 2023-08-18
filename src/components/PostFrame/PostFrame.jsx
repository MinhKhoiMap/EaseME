// Import libraries
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Import services
import PostService from "../../services/post.service";

// Import redux utilities
import { tagsSelector } from "../../redux/selectors/tagSelector";

// Import components
import DropDown from "../DropDown/DropDown";
import Loader from "../Loader/Loader";

// Import styles
import "./PostFrame.css";
import "react-quill/dist/quill.snow.css";

// Import utilities
import defaultAva from "../../assets/images/avatar-default.png";

// const token_test =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiNjRhNmQ2Y2ZhMzkyMmQ1ZDQ3Y2NkNDY4IiwiaWF0IjoxNjkwNzY4NDc5fQ.nk0gDmaSiKEqROe90V0ceiA7Ioef7dqXviHWy4S9gEo";

const modules = {
  toolbar: [
    [{ header: 2 }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }, "blockquote"],
    [{ align: [] }, { indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    ["clean"],
  ],
};

// Functional Components
const PostFrame = ({ avaURL, contentPost = "", setContentPost }) => {
  const queryClient = useQueryClient();
  const tagsData = useSelector(tagsSelector);

  const quillReact = useRef();

  const [editMode, setEditMode] = useState(false);
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [tagsList, setTagsList] = useState([]);
  const [textEdit, setTextEdit] = useState(contentPost);
  const [tagsSelected, setTagsSelected] = useState(null);
  const [privacy, setPrivacy] = useState(null);

  useEffect(() => {
    setTagsList(tagsData);
  }, [tagsData]);

  function resetState() {
    setTextEdit("");
    setEditMode(false);
    setPrivacy(null);
    setTagsSelected(null);
  }

  const postStoryMutation = useMutation({
    mutationFn: () => {
      console.log("first time mutation");
      const quill = quillReact.current.getEditor();
      console.log(quill.getContents(), ";V");
      setIsLoading(true);
      return PostService.createPost(
        {
          content: textEdit,
          contentText: quill.getText(),
          tag: tagsSelected._id,
          privacy:
            String(privacy.tag).toLocaleLowerCase() === "chỉ mình tôi"
              ? "Private"
              : String(privacy.tag).toLocaleLowerCase() === "công khai"
              ? "Public"
              : "Only Psychologists",
          reaction_number: 0,
          deleted: false,
        },
        localStorage.getItem("access_token")
      );
    },
  });

  function postStory(e) {
    e.preventDefault();
    setContentPost(textEdit);
    if (tagsSelected && tagsSelected._id && privacy) {
      postStoryMutation.mutate(undefined, {
        onSuccess: (response) => {
          // console.log(response, " mutations ");
          queryClient.invalidateQueries({ queryKey: ["postsList"] });
          resetState();
        },
        onSettled: () => {
          setIsLoading(false);
        },
      });
    } else {
      alert("You are not allowed to access this action");
    }
  }

  // Trigger submit button
  useEffect(() => {
    const quill = quillReact.current.getEditor();
    // console.log(quill.getLength());
    if (quill.getLength() - 1 > 0 && tagsSelected?.tag && privacy?.tag) {
      setIsDisabledButton(false);
    } else {
      setIsDisabledButton(true);
    }
  }, [textEdit, tagsSelected?.tag, privacy?.tag]);

  /* ************ Render JSX ************ */
  return (
    <div
      className={`post-frame ${editMode ? "edit-mode" : ""}`}
      onClick={() => {
        setEditMode(false);
      }}
    >
      <div className="post-frame__wrapper" onClick={(e) => e.stopPropagation()}>
        <div
          className="avatar"
          style={{ backgroundImage: `url(${avaURL ? avaURL : defaultAva})` }}
        ></div>
        <form className="post-section" onSubmit={postStory}>
          <div className="text-editor" onClick={() => setEditMode(true)}>
            <ReactQuill
              id="editor"
              ref={quillReact}
              theme="snow"
              value={textEdit}
              onChange={setTextEdit}
              modules={modules}
              placeholder={"Bạn đang cảm thấy thế nào?..."}
            />
          </div>
          <div className="feature-section">
            <div className="options-group">
              <DropDown
                label="Quyền riêng tư"
                listItem={[
                  {
                    tag: "Chỉ mình tôi",
                    icon: <i className="fa-solid fa-lock"></i>,
                  },
                  {
                    tag: "Chỉ chuyên gia",
                    icon: <i className="fa-solid fa-stethoscope"></i>,
                  },
                  {
                    tag: "Công khai",
                    icon: <i className="fa-solid fa-earth-asia"></i>,
                  },
                ]}
                selected={privacy}
                setSelected={setPrivacy}
              />
              <DropDown
                label="Phân loại"
                listItem={tagsList}
                bullet={true}
                selected={tagsSelected}
                setSelected={setTagsSelected}
              />
            </div>
            <button className="submit-post-btn" disabled={isDisabledButton}>
              Đăng bài
            </button>
          </div>
        </form>
      </div>

      {isLoading && <Loader />}
    </div>
  );
};

export default PostFrame;
