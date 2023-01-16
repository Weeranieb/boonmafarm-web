import SearchFeedType from "../ui-components/SearchFeedType";
import "./FeedPrice.css";
import "./General.css";
import { Link } from "react-router-dom";

const FeedPrice = () => {
  return (
    <div>
      <div className="header">ราคาเหยื่อ</div>
      <hr />
      <div className="text-start select-date ms-4">
        <form action="#!">
          <SearchFeedType />
        </form>
      </div>
      <div style={{ height: "40px" }}></div>
      <div className="row">
        <div className="col-6">
          <div className="edit-header mb-4">เพิ่ม/แก้ไขราคาเหยื่อ</div>
          <div className="input">
            <form action="#!" id="feed_price"></form>
            <table className="text-center table table-borderless" width="100%">
              <tbody>
                <tr>
                  <td className="text-end pe-4" style={{ width: "30%" }}>
                    ประเภทเหยื่อ:
                  </td>
                  <td className="text-start">
                    <select
                      name="feed_type"
                      id="feed_type"
                      form="feed_price"
                      aria-label="Disabled select example"
                      disabled
                      className="form-select form-select-sm"
                      style={{ width: "95px" }}
                    >
                      <option value="fish" selected="selected">
                        เหยื่อสด
                      </option>
                      <option value="pro_feed">โปรฟีด</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="text-end pe-4" style={{ width: "30%" }}>
                    คนขายเหยื่อ:
                  </td>
                  <td className="text-start">
                    <select
                      name="vendor"
                      id="vendor"
                      form="feed_price"
                      aria-label="Disabled select example"
                      disabled
                      className="form-select form-select-sm"
                      style={{ width: "80px" }}
                    >
                      <option value="sa" selected="selected">
                        สา
                      </option>
                      <option value="nong">น้อง</option>
                      <option value="pu">ปุ๊</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="text-end pe-4">
                    <label for="date">วันที่ขึ้นราคา:</label>
                  </td>
                  <td className="text-start">
                    <input
                      type="date"
                      name="date"
                      id="date"
                      form="feed_price"
                      className="form-control form-control-sm"
                      style={{ width: "185px" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-end pe-4">
                    <label for="price">ราคา:</label>
                  </td>
                  <td className="text-start">
                    <input
                      type="text"
                      name="price"
                      inputmode="numeric"
                      id="price"
                      form="feed_price"
                      className="form-control form-control-sm"
                      style={{ width: "185px" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-end pe-4" style={{ width: "30%" }}>
                    หน่วย:
                  </td>
                  <td className="text-start">
                    <select
                      name="unit"
                      id="unit"
                      form="feed_price"
                      aria-label="Disabled select example"
                      disabled
                      className="form-select form-select-sm"
                      style={{ width: "120px" }}
                    >
                      <option value="Baht per box" selected="selected">
                        บาทต่อกิโล
                      </option>
                      <option value="Baht per kilo">บาทต่อกิโล</option>
                      <option value="Baht per bag">บาทต่อถุง</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ height: "40px" }}></div>
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
          <div className="border border-2 rounded rounded-3 p-2 justify-content-between">
            <div class="d-flex justify-content-between p-3">
              <div className="box-header">ประวัติราคา</div>
              <div className="text-primary watch-all">ดูทั้งหมด</div>
            </div>
            <table className="table">
              <thead className="text-center" style={{ fontSize: "17px" }}>
                <th style={{ width: "46%" }}>วันที่</th>
                <th style={{ width: "18%" }}>จำนวน</th>
                <th style={{ width: "18%" }}>หน่วย</th>
                <th style={{ width: "18%" }}></th>
              </thead>
              <tbody>
                <tr>
                  <td className="text-left ps-3">17 ธ.ค. 2565 - ปัจจุบัน</td>
                  <td className="text-center">121</td>
                  <td className="text-center">บาท/โล</td>
                  <td className="text-center">แก้ไข</td>
                </tr>
                <tr>
                  <td className="text-left ps-3">15 - ก.ค. - 16 ธ.ค. 2565</td>
                  <td className="text-center">121</td>
                  <td className="text-center">บาท/โล</td>
                  <td className="text-center">แก้ไข</td>
                </tr>
                <tr>
                  <td className="text-left ps-3">
                    24 พ.ค. 2565 - 09 มิ.ย. 2565{" "}
                  </td>
                  <td className="text-center">121</td>
                  <td className="text-center">บาท/โล</td>
                  <td className="text-center">แก้ไข</td>
                </tr>
                <tr>
                  <td className="text-left ps-3">
                    12 พ.ค. 2565 - 24 พ.ค. 2565
                  </td>
                  <td className="text-center">121</td>
                  <td className="text-center">บาท/โล</td>
                  <td className="text-center">แก้ไข</td>
                </tr>
                <tr>
                  <td className="text-left ps-3">
                    01 พ.ค. 2565 - 12 พ.ค. 2565
                  </td>
                  <td className="text-center">121</td>
                  <td className="text-center">บาท/โล</td>
                  <td className="text-center">แก้ไข</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPrice;
