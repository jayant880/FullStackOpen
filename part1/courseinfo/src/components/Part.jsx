const Part = (props) => {
  const { part, excercise } = props;
  return (
    <p>
      {part} {excercise}
    </p>
  );
};

export default Part;
