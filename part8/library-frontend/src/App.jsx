import { NavLink, Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <div>
        <NavLink to="/authors">
          {({ isActive }) => (
            <button
              style={{ backgroundColor: isActive ? "lightblue" : "lightgray" }}
            >
              authors
            </button>
          )}
        </NavLink>
        <NavLink to="/books">
          {({ isActive }) => (
            <button
              style={{ backgroundColor: isActive ? "lightblue" : "lightgray" }}
            >
              books
            </button>
          )}
        </NavLink>
        <NavLink to="/add">
          {({ isActive }) => (
            <button
              style={{ backgroundColor: isActive ? "lightblue" : "lightgray" }}
            >
              add book
            </button>
          )}
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default App;
