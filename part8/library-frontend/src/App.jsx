import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default App;
