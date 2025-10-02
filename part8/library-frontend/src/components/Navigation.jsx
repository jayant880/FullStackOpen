import { NavLink } from "react-router-dom";

const Navigation = () => {
  const navItems = [
    { path: "/authors", label: "authors" },
    { path: "/books", label: "books" },
    { path: "/add", label: "add book" },
  ];

  return (
    <nav>
      {navItems.map(({ path, label }) => (
        <NavLink key={path} to={path}>
          {({ isActive }) => (
            <button
              style={
                isActive
                  ? { backgroundColor: "lightblue" }
                  : { backgroundColor: "lightgray" }
              }
            >
              {label}
            </button>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
