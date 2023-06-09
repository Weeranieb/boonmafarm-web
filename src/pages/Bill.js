import SearchDate from "../ui-components/SearchDate";
import "./Bill.css";
const Bill = () => {
  return (
    <div>
      <div className="bill-header">ค่าใช้จ่ายรายเดือน</div>
      <div className="ms-5 bill-content mt-4">
        <hr />
        <div className="row">
          <div className="col-6">
            <div className="me-4">
              <div className="mb-4">
                <span className="fs-3">กรอกค่าใช้จ่าย</span>
              </div>

              <div>
                <form action="#!">
                  <label htmlFor="electricity_bill" className="me-3">
                    ค่าไฟ:
                  </label>
                  <input
                    type="text"
                    name="electricity_bill"
                    id="electricity_bill"
                    inputMode="numeric"
                    className="form-control form-control-sm"
                    style={{ width: "100px" }}
                  />
                  <br />
                  <br />
                  <label htmlFor="worker_salary" className="me-3">
                    ค่าแรงลูกน้อง:
                  </label>
                  <input
                    type="text"
                    name="worker_salary"
                    id="worker_salary"
                    inputMode="numeric"
                    className="form-control form-control-sm"
                    style={{ width: "100px" }}
                  />
                </form>
              </div>
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
            <div className="text-end">
              <form action="#!">
                <div className="mb-4">
                  <SearchDate />
                </div>
              </form>
            </div>
            <div className="border border-2 rounded rounded-3 p-2 justify-content-between">
              <div className="d-flex justify-content-between">
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
