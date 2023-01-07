const App = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3"
      style={{
        width: "280px",
        position: "fixed",
        height: "100%",
        backgroundColor: "#232d44",
      }}
    >
      <div className="d-flex align-items-center mb-3 mb-md-0 link-light text-decoration-none justify-content-between">
        <div className="text-start h2">Boonmafarm</div>
        <div className="text-end btn btn-secondary">
          <i class="fa-regular fa-user"></i>
        </div>
      </div>
      <hr className="bg-light" />
      <ul className="nav nav-pills flex-column mb-auto">
        <li>
          <a href="#!" className="nav-link link-light">
            หน้าแรก
          </a>
          <a href="#!" className="nav-link link-light">
            บ่อปลา
          </a>
          <a href="#!" className="nav-link link-light">
            กรอกข้อมูล
          </a>
          <a href="#!" className="nav-link link-light">
            สถิติ
          </a>
          <a href="#!" className="nav-link link-light">
            ประวัติ
          </a>
        </li>
      </ul>
      <hr className="bg-light" />
      <div className="dropdown text-light">mdo</div>
    </div>
  );
};

export default App;
