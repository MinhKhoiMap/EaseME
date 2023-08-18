// Import libraries
import { useState } from "react";

// Import styles
import "./ShowImageModal.css";

const ShowImageModal = ({ src, alt = "", closeModalFunc }) => {
  return (
    <div className="show-image__modal" onClick={closeModalFunc}>
      <div
        className="show-image__modal-container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <figure className="image__wrapper">
          <img src={src} alt={alt} />
        </figure>
        <button className="close-modal-btn" onClick={closeModalFunc}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default ShowImageModal;
