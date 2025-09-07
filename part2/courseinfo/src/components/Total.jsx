const Total = (props) => {
  const { parts } = props;
  let sum = parts.reduce((s, p) => s + p.exercises, 0);
  return <p>Number of excercises {sum}</p>;
};
export default Total;
