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
          height: "100%",
        }}
      >
        <SidebarContent />
        <main
          // className="d-flex"
          style={{
            padding: 10,
            width: "1220px",
          }}
        >
          <RoutePage />
        </main>
      </div>
    </Router>
  );
};

export default App;
