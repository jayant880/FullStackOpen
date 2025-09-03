import Part from "./Part";

const Content = (props) => {
  return (
    <>
      <Part part={props.content[0]} excercise={props.content[3]} />
      <Part part={props.content[1]} excercise={props.content[4]} />
      <Part part={props.content[2]} excercise={props.content[5]} />
    </>
  );
};

export default Content;
