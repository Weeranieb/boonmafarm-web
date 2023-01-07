const App = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style={{ width: "280px", position: "fixed", height: "100%" }}
    >
      <h3 className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        Boonmafarm
      </h3>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li>
          <a href="#!" className="nav-link link-dark">
            หน้าแรก
          </a>
          <a href="#!" className="nav-link link-dark">
            บ่อปลา
          </a>
          <a href="#!" className="nav-link link-dark">
            กรอกข้อมูล
          </a>
          <a href="#!" className="nav-link link-dark">
            สถิติ
          </a>
          <a href="#!" className="nav-link link-dark">
            ประวัติ
          </a>
        </li>
      </ul>
      <hr />
      <div className="dropdown">mdo</div>
    </div>
  );
};

export default App;
