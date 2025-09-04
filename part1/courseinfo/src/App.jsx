import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    excercise: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    excercise: 7,
  };
  const part3 = {
    name: "State of components",
    excercise: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total total={part1.excercise + part2.excercise + part3.excercise} />
    </div>
  );
};

export default App;
