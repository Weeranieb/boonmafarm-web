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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            fill="currentColor"
            class="bi bi-bell"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
          </svg>
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
