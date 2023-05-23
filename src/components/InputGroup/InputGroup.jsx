import "./InputGroup.css";

const InputGroup = ({
  text,
  placeholderText = "Nhập ở đây...",
  required = true,
  target,
  type = "text",
  borderRadius = 0,
  value,
  setValue,
}) => {
  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="input-group__wrapper">
      <label className="input-group__label" for={target}>
        {text}
        <span>{required && "*"}</span>
      </label>
      <div
        className="input-group__input-wrap"
        style={{ "--border": borderRadius + "px" }}
      >
        <input
          id={target}
          required={required}
          type={type}
          placeholder={placeholderText}
          value={value}
          onChange={handleChangeValue}
        />
      </div>
    </div>
  );
};

export default InputGroup;
