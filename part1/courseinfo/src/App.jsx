import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentas of React";
  const exercise1 = 10;
  const part2 = "Using props to pass data";
  const exercise2 = 7;
  const part3 = "State of a component";
  const exercise3 = 14;
  const content = [part1, part2, part3, exercise1, exercise2, exercise3];

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total total={exercise1 + exercise2 + exercise3} />
    </div>
  );
};

export default App;
