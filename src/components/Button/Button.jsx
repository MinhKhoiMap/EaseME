import "./Button.css";

const Button = ({ className, text, borderWidth, handelOnClick, props }) => {
  return (
    <button
      className={className + " " + "btn"}
      onClick={handelOnClick}
      style={{ borderWidth: borderWidth }}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
