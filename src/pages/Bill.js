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
        <div className="row">
          <div className="col-6">
            <div className="me-4">
              <form action="#!">
                <label for="electricity_bill" className="me-3">
                  ค่าไฟ:
                </label>
                <input
                  type="text"
                  name="electricity_bill"
                  id="electricity_bill"
                  inputmode="numeric"
                  className="form-control form-control-sm"
                  style={{ width: "100px" }}
                />
                <br />
                <br />
                <label for="worker_salary" className="me-3">
                  ค่าแรงลูกน้อง:
                </label>
                <input
                  type="text"
                  name="worker_salary"
                  id="worker_salary"
                  inputmode="numeric"
                  className="form-control form-control-sm"
                  style={{ width: "100px" }}
                />
              </form>
            </div>
            <button
              className="btn btn-primary btn-sm"
              style={{
                fontSize: "13px",
                position: "relative",
                top: "10px",
                left: "260px",
              }}
            >
              บันทึก
            </button>
          </div>
          <div className="col">
            <div className="border border-2 rounded rounded-3 p-2 justify-content-between">
              <div class="d-flex justify-content-between">
                <div className="box-header">ประวัติราคา</div>
                <div className="text-primary watch-all">ดูทั้งหมด</div>
              </div>
              <table className="table">
                <thead className="text-center" style={{ fontSize: "17px" }}>
                  <th>เดือน</th>
                  <th>ค่าไฟ</th>
                  <th>ค่าแรงลูกน้อง</th>
                  <th></th>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-left">ธันวาคม 2565</td>
                    <td className="text-center">85,589</td>
                    <td className="text-center">86,000</td>
                    <td className="text-center">แก้ไข</td>
                  </tr>
                  <tr>
                    <td className="text-left">ธันวาคม 2565</td>
                    <td className="text-center">85,589</td>
                    <td className="text-center">86,000</td>
                    <td className="text-center">แก้ไข</td>
                  </tr>
                  <tr>
                    <td className="text-left">ธันวาคม 2565</td>
                    <td className="text-center">85,589</td>
                    <td className="text-center">86,000</td>
                    <td className="text-center">แก้ไข</td>
                  </tr>
                  <tr>
                    <td className="text-left">ธันวาคม 2565</td>
                    <td className="text-center">85,589</td>
                    <td className="text-center">86,000</td>
                    <td className="text-center">แก้ไข</td>
                  </tr>
                  <tr>
                    <td className="text-left">ธันวาคม 2565</td>
                    <td className="text-center">85,589</td>
                    <td className="text-center">86,000</td>
                    <td className="text-center">แก้ไข</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bill;
