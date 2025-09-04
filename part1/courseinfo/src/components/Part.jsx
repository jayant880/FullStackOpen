const Part = (props) => {
  const { part } = props;
  console.log(part);
  return (
    <p>
      {part.name} {part.excercise}
    </p>
  );
};

export default Part;
