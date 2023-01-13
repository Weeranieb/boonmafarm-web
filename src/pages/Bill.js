import "./Bill.css";
const Bill = () => {
  return (
    <div>
      <div className="bill-header">ค่าใช้จ่ายรายเดือน</div>
      <div className="ms-5 bill-content mt-5">
        <form action="#!">
          <div className="mb-3">
            <label for="month" className="me-3">
              เดือน
            </label>
            <select name="month" id="month">
              <option value="javascript">JavaScript</option>
              <option value="php">PHP</option>
              <option value="java">Java</option>
              <option value="golang">Golang</option>
              <option value="python">Python</option>
              <option value="c#">C#</option>
              <option value="C++">C++</option>
              <option value="erlang">Erlang</option>
            </select>
            <label for="year" className="ms-4 me-3">
              ปี
            </label>
            <select name="year" id="year">
              <option value="javascript">JavaScript</option>
              <option value="php">PHP</option>
              <option value="java">Java</option>
              <option value="golang">Golang</option>
              <option value="python">Python</option>
              <option value="c#">C#</option>
              <option value="C++">C++</option>
              <option value="erlang">Erlang</option>
            </select>
            <button
              className="ms-4 btn btn-primary"
              style={{ position: "relative", bottom: "5px" }}
            >
              ค้นหา
            </button>
          </div>
          <hr />
          <div className="me-4">
            <form action="#!">
              <label for="electricity_bill" className="me-3">
                ค่าไฟ
              </label>
              <input
                type="text"
                name="electricity_bill"
                id="electricity_bill"
              />
              <br />
              <br />
              <label for="worker_salary" className="me-3">
                ค่าแรงลูกน้อง
              </label>
              <input type="text" name="worker_salary" id="worker_salary" />
              <br />
              <br />
              <button className="btn btn-primary">บันทึก</button>
            </form>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Bill;
