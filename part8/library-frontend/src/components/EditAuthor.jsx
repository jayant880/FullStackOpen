import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../service/queries";

const EditAuthor = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.error("Error while updating Author", error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const yearNum = parseInt(year);
    if (!yearNum) {
      setError("Year must be a number");
      return;
    }

    try {
      await editAuthor({
        variables: {
          name,
          setBornTo: yearNum,
        },
      });

      setName("");
      setYear("");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Set BirthYear</h2>
      <p>{error}</p>
      <form onSubmit={handleSubmit}>
        <label>
          name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </label>
        <br />
        <label>
          born:
          <input
            type="text"
            name="setToBorn"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </label>
        <br />
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default EditAuthor;
