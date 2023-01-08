import RoutePage from "./components/RoutePage";
import SidebarContent from "./components/SidebarContent";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        height: "100%",
      }}
    >
      <SidebarContent />
      <main
        style={{
          padding: 10,
          width: "1220px",
        }}
      >
        <RoutePage />
      </main>
    </div>
  );
};

export default App;
