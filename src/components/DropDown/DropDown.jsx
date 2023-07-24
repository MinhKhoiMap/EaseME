import { useEffect, useState } from "react";
import "./DropDown.css";

const DropDown = ({
  selected = null,
  setSelected,
  listItem,
  label,
  bullet = false,
  defaultColor = "#808080",
}) => {
  const [showList, setShowList] = useState(false);
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [iconJSX, setIconJSX] = useState(null);

  console.log(listItem, "listItem");

  function resetState() {
    setSelectedColor(defaultColor);
    setIconJSX(null);
  }

  useEffect(() => {
    if (!selected) resetState();
  }, [selected]);

  return (
    <div
      className={`drop-down ${showList && "drop-down--active"}`}
      onClick={() => setShowList(false)}
    >
      <div
        className="drop-down__button"
        onClick={(e) => {
          e.stopPropagation();
          setShowList((prev) => !prev);
        }}
        style={{
          boxShadow: `0 0 0 1px ${selectedColor}`,
          color: selectedColor,
        }}
      >
        <span className="text">
          {bullet && (
            <span className="bullet">
              <i
                className="fa-solid fa-circle"
                style={{ color: "inherit" }}
              ></i>
            </span>
          )}
          {iconJSX && <span className="icon">{iconJSX}</span>}
          <span>{selected ? selected.tag : label}</span>
        </span>
        <span className="drop-down__icon">
          <i className="fa-solid fa-caret-down"></i>
        </span>
      </div>
      {showList && (
        <div
          className="drop-down__list"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {listItem.map((item) => (
            <div
              className="drop-down__item"
              style={{
                "--bg-pick-color": item?.backgroundColor,
                color: item?.colorText,
              }}
              onClick={() => {
                setSelected(item);
                setSelectedColor(
                  item?.colorText ? item?.colorText : defaultColor
                );
                setIconJSX(item?.icon);
                setShowList(false);
              }}
              data-value={item._id}
              key={item._id ? item._id : item.tag}
            >
              {item.tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
