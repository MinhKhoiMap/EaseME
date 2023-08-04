// Import libraries
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// Import redux utilities
import { tagsSelector } from "../../redux/selectors/tagSelector";

// Import styles
import "./FilterPost.css";

// Import components
import DropDown from "../DropDown/DropDown";

const FilterPost = ({ author, setAuthor, authorItemList }) => {
  const navigate = useNavigate();
  const tagsList = useSelector(tagsSelector);

  const { id_tag } = useParams();

  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    if (id_tag) setSelectedTag(tagsList.filter((tag) => tag._id === id_tag)[0]);
    else setSelectedTag({ _id: "", tag: "Tất cả" });
  }, [id_tag, tagsList]);

  function handleNavigate(tag) {
    navigate(`/page/community/${tag._id}`);
  }
  console.log(selectedTag, "selected");

  return (
    <div className="filter-post">
      <div className="filter-post__container">
        <div className="field-filter">
          <label>Bài viết của: </label>
          <div className="selection">
            <DropDown
              label="Tác giả"
              selected={author}
              listItem={authorItemList}
              setSelected={setAuthor}
            />
          </div>
        </div>
        <div className="field-filter">
          <label>Chủ đề: </label>
          <div id="tag-filter" className="selection">
            <DropDown
              label="Chủ đề"
              selected={selectedTag}
              listItem={[...tagsList, { _id: "", tag: "Tất cả" }]}
              setSelected={handleNavigate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPost;
