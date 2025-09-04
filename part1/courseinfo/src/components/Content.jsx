import Part from "./Part";

const Content = (props) => {
  const { parts } = props;
  return (
    <>
      {parts.map((part) => (
        <Part part={part} key={part.name} />
      ))}
    </>
  );
};

export default Content;
