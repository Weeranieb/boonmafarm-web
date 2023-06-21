import { Fragment, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import SearchDate from "../ui-components/SearchDate";
import "./Bill.css";
import { fetchData } from "../utils/fetch";
const Bill = () => {
  // state by location
  const history = useHistory();
  const location = useLocation();
  const { month, year, worker_salary, electricity_bill } = location.state ?? {};
  console.log(
    "all state variables",
    month,
    year,
    worker_salary,
    electricity_bill
  );
  const tempDate = new Date();
  const [date, setDate] = useState({
    month: month || tempDate.getMonth() + 1,
    year: year || tempDate.getFullYear(),
  });

  const [bill, setBill] = useState({
    worker_salary: { cost: worker_salary || 0, bill_id: -1 },
    electricity_bill: { cost: electricity_bill || 0, bill_id: -2 },
  });

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setDate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeBill = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setBill((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = (event) => {
    event.preventDefault();

    setBill({
      worker_salary: { cost: worker_salary || 0, bill_id: -1 },
      electricity_bill: { cost: electricity_bill || 0, bill_id: -2 },
    });

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    const resetState = () => {
      history.push({
        pathname: "/fillData/bill",
        state: {
          month: date.month,
          year: date.year,
          worker_salary: bill.worker_salary,
          electricity_bill: bill.electricity_bill,
        },
      });
    };

    fetchData(
      `${process.env.REACT_APP_BACKEND}/api/v1/master/getBillByDate?month=${date.month}&year=${date.year}`,
      requestOptions
    ).then((result) => {
      if (!result.error) {
        const obj = {};
        console.log("result", result);
        for (const [billType, bill] of Object.entries(result)) {
          obj[billType] = {
            bill_id: bill.bill_id,
            cost: bill.cost,
          };
        }

        console.log(obj);
        setBill(obj);
        console.log("this is new bill", bill);
        resetState();
      } else {
        resetState();
        setBill({
          worker_salary: { cost: worker_salary || 0, bill_id: -1 },
          electricity_bill: { cost: electricity_bill || 0, bill_id: -2 },
        });
      }
    });
  };

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
                    onChange={handleChangeBill}
                    value={bill.electricity_bill?.cost || 0}
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
                    onChange={handleChangeBill}
                    value={bill.worker_salary?.cost || 0}
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
              <form onSubmit={handleSearch}>
                <div className="mb-4">
                  <SearchDate onChange={handleChange} date={date} />
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
