import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../graphql/queries";

const EditAuthor = () => {
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const { data } = useQuery(ALL_AUTHORS);
  const authors = data?.allAuthors || [];

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.error("Error while updating Author", error.message);
      setError(error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAuthor) {
      setError("Please select an author");
      return;
    }

    const yearNum = parseInt(year);
    if (!yearNum) {
      setError("Year must be a number");
      return;
    }

    try {
      await editAuthor({
        variables: {
          name: selectedAuthor,
          setBornTo: yearNum,
        },
      });

      setSelectedAuthor("");
      setYear("");
      setError("");
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Set BirthYear</h2>
      {error && <div>{error}</div>}

      <form onSubmit={handleSubmit}>
        <label>
          author:
          <select
            value={selectedAuthor}
            onChange={({ target }) => setSelectedAuthor(target.value)}
          >
            <option value="">Select an author</option>
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
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
