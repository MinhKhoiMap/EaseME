import "./Button.css";

const Button = ({ text, borderWidth, handelOnClick }) => {
  return (
    <button
      className="btn"
      onClick={handelOnClick}
      style={{ borderWidth: borderWidth }}
    >
      {text}
    </button>
  );
};

export default Button;
