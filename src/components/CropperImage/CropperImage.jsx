import { useCallback, useState } from "react";
import "./CropperImage.css";

import Cropper from "react-easy-crop";

import Button from "../Button/Button";
import getCroppedImg from "./utils/CropImg";

const CropperImage = ({
  imageURL,
  imgSizeX = 100,
  imgSizeY = 100,
  maxvalZoom = 5,
  stepZoom = 0.5,
  cropShape = "",
  setPhotoURL,
  closeCropModalFunc,
  saveCroppedImgFunc,
  title = "Cropper Image",
}) => {
  const [showInstructions, setShowInstructions] = useState(true);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    // console.log(croppedAreaPixels, crop);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getResultCroppedImg = async () => {
    try {
      const { file, blob } = await getCroppedImg(
        imageURL,
        croppedAreaPixels,
        rotation
      );
      // console.log(file, blob, "vcl");
      return { croppedFile: file, blob };
    } catch (e) {
      console.log(e, "error at cropping image");
    }
  };

  return (
    <div className="cropper-image" onClick={closeCropModalFunc}>
      <div
        className="cropper-image__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cropper-image__header">
          <h2>{title}</h2>
        </div>
        <div className="cropper-image__body">
          <div
            className="cropper-image__display-image-container"
            style={{
              "--imgSizeX": imgSizeX + "px",
              "--imgSizeY": imgSizeY + "px",
            }}
            onMouseEnter={() => setShowInstructions(false)}
            onMouseLeave={() => setShowInstructions(true)}
          >
            {showInstructions && (
              <div className="cropper-image__instructor">
                <i className="fa-solid fa-arrows-up-down-left-right"></i>
                Kéo để thay đổi vị trí
              </div>
            )}
            <Cropper
              classes={{
                containerClassName: "cropper-image__display-image",
                cropAreaClassName: "cropper-image__crop-area",
              }}
              image={imageURL}
              crop={crop}
              zoom={zoom}
              aspect={1 / 2}
              maxZoom={maxvalZoom}
              rotation={rotation}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropShape={cropShape}
              onRotationChange={setRotation}
              cropSize={{ width: imgSizeX, height: imgSizeY }}
            />
          </div>
          <div className="cropper-image__edit-group">
            <div className="range-slider__wrapper zoom-slide">
              <label className="range-slider__name">Phóng to:</label>
              <div className="edit-group">
                <button
                  className="descrease"
                  onClick={() =>
                    setZoom((prev) => {
                      if (prev > 1) return prev - stepZoom;
                      return prev;
                    })
                  }
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <div className="range-slider">
                  <input
                    type="range"
                    name="zoom-range"
                    id="zoom-range"
                    min={1}
                    max={maxvalZoom}
                    value={zoom}
                    step={stepZoom}
                    onScroll={() => console.log("first")}
                    onChange={(e) => {
                      setZoom(e.target.value);
                      // console.log(
                      //   e.target.value,
                      //   ((e.target.value - 1) / (maxvalZoom - 1)) * 100
                      // );
                    }}
                  />

                  <div
                    className="progress-bar"
                    style={{
                      width: ((zoom - 1) / (maxvalZoom - 1)) * 100 + "%",
                    }}
                  ></div>
                </div>
                <button
                  className="increase"
                  onClick={() =>
                    setZoom((prev) => {
                      if (prev < maxvalZoom) return prev + stepZoom;
                      return prev;
                    })
                  }
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
            <div className="range-slider__wrapper rotation-slide">
              <label className="range-slider__name">Xoay:</label>
              <div className="edit-group">
                <button
                  className="descrease"
                  onClick={() =>
                    setRotation((prev) => {
                      if (prev > 0) return prev - 15;
                      return prev;
                    })
                  }
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <div className="range-slider">
                  <input
                    type="range"
                    name="rotation-range"
                    id="rotation-range"
                    min={0}
                    max={360}
                    value={rotation}
                    step={15}
                    onChange={(e) => setRotation(e.target.value)}
                  />

                  <div
                    className="progress-bar"
                    style={{ width: (rotation / 360) * 100 + "%" }}
                  ></div>
                </div>
                <button
                  className="increase"
                  onClick={() =>
                    setRotation((prev) => {
                      if (prev < 360) return prev + 15;
                      return prev;
                    })
                  }
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
          {/* <div className="cropper-image__preview-avatar">
            <button onClick={getResultCroppedImg}>show</button>
            <img src={croppedImg?.blob} alt="preview-image" />
          </div> */}
        </div>
        <footer className="cropper-image__footer">
          <Button
            text="Hủy"
            className="close-btn"
            props={{ onClick: closeCropModalFunc }}
          />
          <Button
            text="Lưu"
            className="complete-btn"
            props={{
              onClick: async () => {
                // const { croppedFile, blob } = await getResultCroppedImg();
                const croppedImageObject = await getResultCroppedImg();
                // console.log(croppedFile, "vai");
                saveCroppedImgFunc(croppedImageObject);
                // setPhotoURL(url);
              },
            }}
          />
        </footer>
        <button className="top-close-btn" onClick={closeCropModalFunc}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default CropperImage;
