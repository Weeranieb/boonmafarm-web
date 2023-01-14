import SearchDate from "../ui-components/SearchDate";
import "./Bill.css";
const Bill = () => {
  return (
    <div>
      <div className="bill-header">ค่าใช้จ่ายรายเดือน</div>
      <div className="ms-5 bill-content mt-4">
        <form action="#!">
          <div className="mb-3">
            <SearchDate />
          </div>
        </form>
        <hr />
        <div className="me-4">
          <form action="#!">
            <label for="electricity_bill" className="me-3">
              ค่าไฟ
            </label>
            <input type="text" name="electricity_bill" id="electricity_bill" />
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
      </div>
    </div>
  );
};

export default Bill;
