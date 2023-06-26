import { useState } from "react";
import "./PostFrame.css";

import EditPostModal from "../EditPostModal/EditPostModal";

import wall from "../../assets/images/avatarTest.png";

const PostFrame = () => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="post-frame">
      <div className="post-frame__wrapper">
        <div
          className="avatar"
          style={{ backgroundImage: `url(${wall})` }}
        ></div>
        <form className="post-section">
          <textarea
            name="post-editer"
            placeholder="Cậu thấy thế nào"
            onClick={() => setShowEditModal(true)}
          ></textarea>
          <button className="submit-post-btn" disabled={true}>
            Đăng
          </button>
        </form>
      </div>
      {showEditModal && <EditPostModal />}
    </div>
  );
};

export default PostFrame;
