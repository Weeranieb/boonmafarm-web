import { Fragment, useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import SearchDate from "../ui-components/SearchDate";
import "./Bill.css";
import { fetchData } from "../utils/fetch";
import { billConst } from "../constants/bill";
import { fullMonthThai } from "../utils/date";
const Bill = () => {
  // state by location
  const history = useHistory();
  const location = useLocation();
  const { month, year, worker_salary, electricity_bill, bill_histories } =
    location.state ?? {};
  console.log(
    "all state variables",
    month,
    year,
    worker_salary,
    electricity_bill,
    bill_histories
  );
  const tempDate = new Date();
  const [billHistories, setBillHistories] = useState(bill_histories || []);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [date, setDate] = useState({
    month: month || tempDate.getMonth() + 1,
    year: year || tempDate.getFullYear(),
  });

  const [state, setState] = useState({
    month: date.month,
    year: date.year,
    worker_salary: undefined,
    electricity_bill: undefined,
    bill_histories: [],
  });

  const [bill, setBill] = useState({
    worker_salary: worker_salary,
    electricity_bill: electricity_bill,
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
    const { value, name } = event.target;
    setBill((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        cost: value,
      },
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

    const resetState = (obj) => {
      history.push({
        pathname: "/fillData/bill",
        state: state,
      });
    };

    fetchData(
      `${process.env.REACT_APP_BACKEND}/api/v1/master/getBillByDate?month=${date.month}&year=${date.year}`,
      requestOptions
    ).then((result) => {
      if (!result.error) {
        const obj = {};
        for (const [billType, bill] of Object.entries(result)) {
          obj[billType] = {
            bill_id: bill.bill_id,
            cost: bill.cost,
          };
        }
        setBill(obj);
        console.log(obj);
        setState((prevState) => ({
          ...prevState,
          worker_salary: obj?.worker_salary,
          electricity_bill: obj?.electricity_bill,
        }));
      }
    });

    fetchData(
      `${process.env.REACT_APP_BACKEND}/api/v1/master/getBillList`,
      requestOptions
    ).then((result) => {
      if (!result.error) {
        setBillHistories(result);
        console.log("history", result);
        setState((prevState) => ({
          ...prevState,
          bill_histories: result,
        }));
      }
    });

    console.log(state);
    resetState();
    setShouldRefresh(shouldRefresh);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const requestBody = {
      bill: [],
    };

    let index = -1;
    for (const [key, value] of Object.entries(bill)) {
      const billType = billConst[key];
      requestBody.bill.push({
        bill_id: value.bill_id || index,
        bill_type: billType,
        cost: Number(value.cost),
        date_issued: `${date.year}-${String(date.month).padStart(
          2,
          "0"
        )}-01T00:00:00Z`,
        record_status: "A",
      });
      if (!value.bill_id) {
        index--;
      }
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    let requestOptions = {
      body: JSON.stringify(requestBody),
      method: "POST",
      headers: headers,
    };

    fetch(
      `${process.env.REACT_APP_BACKEND}/api/v1/master/saveBills`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          refreshStateAfterSave(data.result);
        } else {
          console.log(data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    const refreshStateAfterSave = (keyBillIdByBillType) => {
      // if it's new than new save
      if (index === -(Object.keys(bill).length + 1)) {
        const billDetail = [];
        for (const [key, value] of Object.entries(bill)) {
          billDetail.push({
            bill_id: keyBillIdByBillType[billConst[key]],
            bill_type: key,
            cost: value.cost,
          });
        }
        billHistories.unshift({
          date: `${fullMonthThai[date.month - 1]} ${date.year + 543}`,
          bill: billDetail,
          month: date.month,
          year: date.year,
        });
      }

      history.push({
        pathname: `/fillData/bill`,
        state: {
          month: date.month,
          year: date.year,
        },
      });
    };
  };

  useEffect(() => {
    if (shouldRefresh) {
      window.location.reload();
    }
    // Perform actions that depend on the updated state
    const tempMonth = month;
    const tempYear = year;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetchData(
      `${process.env.REACT_APP_BACKEND}/api/v1/master/getBillByDate?month=${tempMonth}&year=${tempYear}`,
      requestOptions
    ).then((result) => {
      if (!result.error) {
        const obj = {};
        for (const [billType, bill] of Object.entries(result)) {
          obj[billType] = {
            bill_id: bill.bill_id,
            cost: bill.cost,
          };
        }
        setBill(obj);
        console.log(obj);
        setState((prevState) => ({
          ...prevState,
          worker_salary: obj?.worker_salary,
          electricity_bill: obj?.electricity_bill,
        }));
      }
    });
  }, [month, year]);

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
              <form onSubmit={handleSave}>
                <div>
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
                    value={bill.electricity_bill?.cost || ""}
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
                    value={bill.worker_salary?.cost || ""}
                  />
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
              </form>
            </div>
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
                  <tr>
                    <th>เดือน</th>
                    <th>ค่าไฟ</th>
                    <th>ค่าแรงลูกน้อง</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {billHistories.slice(0, 6).map((temp, index) => (
                    <Fragment key={index}>
                      <tr>
                        <td className="text-left">{temp.date}</td>
                        <td className="text-center">
                          {temp.bill[billConst.electricity_bill] || "-"}
                        </td>
                        <td className="text-center">
                          {temp.bill[billConst.worker_salary] || "-"}
                        </td>
                        <td>
                          <Link
                            to={{
                              pathname: `/fillData/bill`,
                              state: {
                                month: temp.month - 1,
                                year: temp.year,
                              },
                            }}
                            className="link-dark text-center"
                            // onClick={() => setShouldRefresh(true)}
                          >
                            แก้ไข
                          </Link>
                        </td>
                      </tr>
                    </Fragment>
                  ))}
                  {billHistories.length === 0 && (
                    <tr style={{ height: "40px" }}></tr>
                  )}
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
