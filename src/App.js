import RoutePage from "./components/RoutePage";
import SidebarContent from "./components/SidebarContent";
import { BrowserRouter as Router } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <div
        style={{
          display: "flex",
          position: "fixed",
          overflow: "hidden",
          height: "100vh",
          width: "100vw",
        }}
      >
        <SidebarContent />
        <RoutePage />
      </div>
    </Router>
  );
};

export default App;
