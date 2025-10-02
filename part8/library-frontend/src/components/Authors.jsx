import { useQuery } from "@apollo/client/react";
import { ALL_AUTHORS } from "../service/queries";
import EditAuthor from "./EditAuthor";

const Authors = () => {
  const { loading, data, error } = useQuery(ALL_AUTHORS);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error: {error.message}</div>;

  const authors = data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <div>
        <EditAuthor />
      </div>
    </div>
  );
};

export default Authors;
