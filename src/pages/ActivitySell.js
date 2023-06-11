import React, { useState } from "react";
import SearchFarm from "../ui-components/SearchFarm";
import { Link } from "react-router-dom";
import "./Activity.css";
import "./General.css";
import TableRows from "../components/TableRows";
import SelectActivity from "../ui-components/SelectActivity";

const ActivitySell = () => {
  const [rows, initRow] = useState([]);
  const addRowTable = () => {
    const data = {
      name: "",
      email: "",
      profile: "",
    };
    initRow([...rows, data]);
  };
  const tableRowRemove = (index) => {
    const dataRow = [...rows];
    dataRow.splice(index, 1);
    initRow(dataRow);
  };
  const onValUpdate = (i, event) => {
    const { name, value } = event.target;
    const data = [...rows];
    data[i][name] = value;
    initRow(data);
  };

  return (
    <div>
      <div className="header">กิจกรรมบ่อ 3/2</div>
      <hr />
      <div className="row">
        <div className="col-6">
          <SelectActivity act={"sell"} />
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
              </tbody>
            </table>
          </div>
          <div>
            {/* new table */}
            <table className="table table-borderless">
              <thead>
                <tr className="text-center">
                  <th>ดัชนี</th>
                  <th>ไซส์</th>
                  <th>จำนวนปลา (กก.)</th>
                  <th>ราคาปลาต่อกิโล</th>
                  <th>ขายได้</th>
                  <th>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={addRowTable}
                    >
                      Insert Row
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <TableRows
                  rows={rows}
                  tableRowRemove={tableRowRemove}
                  onValUpdate={onValUpdate}
                />
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="text-end align-middle">รายได้ทั้งหมด</td>
                  <td>
                    <input
                      type="text"
                      value="0"
                      name="all"
                      className="form-control"
                      disabled
                    />
                  </td>
                  <td></td>
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
                <tr>
                  <th style={{ width: "30%" }}>วันที่</th>
                  <th style={{ width: "50%" }}>กิจกรรม</th>
                  <th style={{ width: "20%" }}></th>
                </tr>
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

export default ActivitySell;
