import SearchFarm from "../ui-components/SearchFarm";
import { Link } from "react-router-dom";
import "./Activity.css";
import "./General.css";

const ActivityFill = () => {
  return (
    <div>
      <div className="header">กิจกรรมบ่อ 3/2</div>
      <hr />
      <div className="row">
        <div className="col-6">
          <div className="edit-header mb-4">ลงปลา</div>
          <div className="input">
            <form action="#!" id="activity"></form>
            <table className="text-center table table-borderless" width="100%">
              <tbody>
                <tr>
                  <td className="text-end pe-4">
                    <label htmlFor="date">วันที่ลงปลา:</label>
                  </td>
                  <td className="text-start">
                    <input
                      type="date"
                      name="date"
                      id="date"
                      form="activity"
                      className="form-control form-control-sm"
                      style={{ width: "185px" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-end pe-4" style={{ width: "30%" }}>
                    จำนวนปลาที่ลง:
                  </td>
                  <td className="text-start">
                    <input
                      type="text"
                      name="price"
                      inputMode="numeric"
                      id="price"
                      form="activity"
                      className="form-control form-control-sm"
                      style={{ width: "185px" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-end pe-4" style={{ width: "30%" }}>
                    น้ำหนักปลาต่อตัว:
                  </td>
                  <td className="text-start">
                    <input
                      type="text"
                      name="price"
                      inputMode="numeric"
                      id="price"
                      form="activity"
                      className="form-control form-control-sm"
                      style={{ width: "185px" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-end pe-4" style={{ width: "30%" }}>
                    ราคาปลา:
                  </td>
                  <td className="text-start">
                    <input
                      type="text"
                      name="price"
                      inputMode="numeric"
                      id="price"
                      form="activity"
                      className="form-control form-control-sm"
                      style={{ width: "185px" }}
                    />
                  </td>
                </tr>

                <tr>
                  <td className="text-end pe-4" style={{ width: "30%" }}>
                    ต้นทุน:
                  </td>
                  <td className="text-start">
                    <input
                      type="text"
                      name="cost"
                      inputMode="numeric"
                      id="cost"
                      form="activity"
                      className="form-control form-control-sm"
                      style={{ width: "185px" }}
                      disabled
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ height: "20px" }}></div>
          <button className="btn btn-primary btn-sm">Save</button>
          <Link
            to="/fillData/feed-price"
            className="btn btn-warning ms-1 btn-sm"
          >
            Cancel
          </Link>
          <Link
            to="/fillData/feed-price"
            className="btn btn-danger ms-1 btn-sm"
          >
            Delete
          </Link>
        </div>
        <div className="col">
          <div className="text-end select-date mb-4">
            <form action="#!">
              <SearchFarm />
            </form>
          </div>
          <div className="border border-2 rounded rounded-3 p-2 justify-content-between">
            <div className="d-flex justify-content-between p-3">
              <div className="box-header">กิจกรรมล่าสุด</div>
              <div className="text-primary watch-all">ดูทั้งหมด</div>
            </div>
            <table className="table">
              <thead className="text-center" style={{ fontSize: "17px" }}>
                <th style={{ width: "30%" }}>วันที่</th>
                <th style={{ width: "50%" }}>กิจกรรม</th>
                <th style={{ width: "20%" }}></th>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td>17 ธ.ค. 2565</td>
                  <td>ลงปลา</td>
                  <td>แก้ไข</td>
                </tr>
                <tr>
                  <td>15 ก.ค. 2565</td>
                  <td>ย้ายปลา</td>
                  <td>แก้ไข</td>
                </tr>
                <tr>
                  <td>24 พ.ค. 2565</td>
                  <td>ย้ายปลา</td>
                  <td>แก้ไข</td>
                </tr>
                <tr>
                  <td>12 พ.ค. 2565</td>
                  <td>ลงปลาจากบ่อ</td>
                  <td>แก้ไข</td>
                </tr>
                <tr>
                  <td>01 พ.ค. 2565</td>
                  <td>ขาย</td>
                  <td>แก้ไข</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFill;
