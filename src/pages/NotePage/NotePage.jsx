import Notes from "../../components/Notes/Notes";

const NotePage = () => {
  return (
    <div
      className="note-page__container"
      style={{ padding: "40px 100px", backgroundColor: "#FFF2EE" }}
    >
      <Notes
        noteType={1}
        text="ehehehhhhhhhhhhhhhhhhhh"
        colorText={"#87A173"}
      />
      <Notes
        noteType={2}
        text="ehehehhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhffffffffffffffffffffffffhhhh"
        colorText={"#87A173"}
      />
      <Notes
        noteType={3}
        text="ehehehhhhhhhhhhhhhhhhhh"
        colorText={"#87A173"}
      />
      <Notes
        noteType={4}
        text="ehehehhhhhhhhhhhhhhhhhh"
        colorText={"#87A173"}
      />
      <Notes
        noteType={5}
        text="ehehehhhhhhhhhhhhhhhhhh"
        colorText={"#87A173"}
      />
    </div>
  );
};

export default NotePage;
