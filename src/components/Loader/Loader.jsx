import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__container">
        <div className="loader__main">
          <div className="chase"></div>
        </div>
        <div className="loader__text">
          Đợi chúng mình một chút nhé!
          <span className="rotating-dots">
            <div></div>
            <div></div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
