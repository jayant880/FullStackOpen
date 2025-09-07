import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course, index) => {
        return (
          <div key={index}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <strong>
              <Total parts={course.parts} />
            </strong>
          </div>
        );
      })}
    </>
  );
};

export default Course;
