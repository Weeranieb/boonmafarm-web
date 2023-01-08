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
    </div>
  );
};

export default App;
