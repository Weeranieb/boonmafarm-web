import SearchFarm from "../ui-components/SearchFarm";
import { Link, useLocation } from "react-router-dom";
import "./Activity.css";
import "./General.css";
import { useState } from "react";
import SelectActivity from "../ui-components/SelectActivity";

const ActivityFill = () => {
  const location = useLocation();
  // const { pond_id, pond_name } = location.state;

  // set state
  // set stateful variables
  const [fillData, setFillData] = useState({
    date: "",
    amount: "",
    weight: "",
    price: "",
    cost: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    let value = event.target.value;
    let name = event.target.name;
    let type = event.target.type;
    if (type === "text") value = Number(value);
    setFillData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(fillData);
  };

  const handleSubmit = () => (event) => {
    event.preventDefault();

    console.log(fillData);
    // Perform actions with the form data
    // For example, send data to a server or update the state

    // Reset the form if needed
    // setFillData({ date: "", amount: "", weight: "", price: "", cost: "" });
  };

  return (
    <div>
      <div className="header">กิจกรรมบ่อ 3/2</div>
      <hr />
      <div className="row">
        <div className="col-6">
          <SelectActivity act={"fill"} />
          <div className="input">
            <form onSubmit={handleSubmit} />
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
                      value={fillData.date}
                      className="form-control form-control-sm"
                      style={{ width: "185px" }}
                      onChange={handleChange}
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
                      name="amount"
                      inputMode="numeric"
                      id="amount"
                      value={fillData.amount}
                      className="form-control form-control-sm"
                      style={{ width: "185px" }}
                      onChange={handleChange}
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
                      name="weight"
                      inputMode="numeric"
                      id="weight"
                      value={fillData.weight}
                      className="form-control form-control-sm"
                      style={{ width: "185px" }}
                      onChange={handleChange}
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
                      value={fillData.price}
                      className="form-control form-control-sm"
                      style={{ width: "185px" }}
                      onChange={handleChange}
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
                      value={fillData.cost}
                      inputMode="numeric"
                      id="cost"
                      className="form-control form-control-sm"
                      style={{ width: "185px" }}
                      onChange={handleChange}
                      disabled
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ height: "20px" }}></div>
          <button className="btn btn-primary btn-sm" type="submit">
            Save
          </button>
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

export default ActivityFill;
