const Total = (props) => {
  const { parts } = props;
  let sum = 0;
  parts.forEach((part) => {
    sum = sum + part.exercises;
  });
  return <p>Number of excercises {sum}</p>;
};
export default Total;
