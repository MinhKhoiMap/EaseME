import "./Button.css";

const Button = ({ text, borderWidth, handelOnClick, props }) => {
  return (
    <button
      className="btn"
      onClick={handelOnClick}
      style={{ borderWidth: borderWidth }}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
