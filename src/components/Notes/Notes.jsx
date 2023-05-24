import "./Notes.css";

import Note1 from "../../assets/images/notes/Note1.png";
import Note2 from "../../assets/images/notes/Note2.png";
import Note3 from "../../assets/images/notes/Note3.png";
import Note4 from "../../assets/images/notes/Note4.png";
import Note5 from "../../assets/images/notes/Note5.png";

const Notes = ({ noteType, text, colorText }) => {
  return (
    <div className={`note__wrapper note__wrapper--${noteType}`}>
      <div className="note__background">
        {noteType === 1 && <img src={Note1} alt={noteType} />}
        {noteType === 2 && <img src={Note2} alt={noteType} />}
        {noteType === 3 && <img src={Note3} alt={noteType} />}
        {noteType === 4 && <img src={Note4} alt={noteType} />}
        {noteType === 5 && <img src={Note5} alt={noteType} />}
      </div>
      <p className="note__text" style={{ color: colorText }}>
        {text}
      </p>
    </div>
  );
};

export default Notes;
