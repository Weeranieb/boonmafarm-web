import { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import SearchFarm from "../ui-components/SearchFarm";
import "./Activity.css";
import "./General.css";
import { fetchData } from "../utils/fetch";
import TableRows from "../components/TableRows";
import SelectActivity from "../ui-components/SelectActivity";
import { pondNameMapId, rowDailyFeeds } from "../utils/pond";
import { activityDictionaryMap } from "../utils/activity";
import { changeTimeUTCToThaiDate } from "../utils/date";
import { merchantNameById } from "../constants/merchant";

const ActivitySell = () => {
  const history = useHistory();
  const location = useLocation();
  const { farm, pond_id, pond_name, active_pond_id, activity_id, activities } =
    location.state ?? {};
  console.log(
    farm,
    pond_id,
    pond_name,
    active_pond_id,
    activity_id,
    activities
  );
  //set state
  const [newSellDetailId, setNewSellDetailId] = useState(-1);
  const [rows, initRow] = useState([]);
  const [selectFarm, setSelectFarm] = useState({
    farm: farm ?? "ฟาร์ม 1",
    pondName: pond_name ?? "1ซ้าย",
    pondId: pond_id ?? 1,
    pondList: farm ? rowDailyFeeds.get(farm) : rowDailyFeeds.get("ฟาร์ม 1"),
  });
  const [pondActivities, setPondActivities] = useState(activities || []);
  const [activePondId, setActivePondId] = useState(active_pond_id ?? -1);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  // set main stateful variables
  const [sellData, setSellData] = useState({
    sell_id: activity_id ?? -1,
    date_issued: "",
    sum_profit: 0,
    additional_cost: 0,
    merchant_id: 1,
  });

  //? use Effect
  useEffect(() => {
    if (shouldRefresh) {
      window.location.reload();
    }

    let sellId = sellData.sell_id;
    if (sellId > 0 && activePondId > 0) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      fetchData(
        `${process.env.REACT_APP_BACKEND}/api/v1/activity/getSellHistory?active_pond_id=${activePondId}&sell_id=${sellId}`,
        requestOptions
      ).then((result) => {
        if (result) {
          if (result.error) console.log(result.error);
          else {
            console.log("result issss", result);
            result.history.date_issued = result.history.date_issued.substring(
              0,
              10
            );
            const updatedRows = result.detail.map((row, index) => ({
              ...row,
              isShow: true,
              total: row.total_amount * row.price_per_kilo,
              no: index + 1,
            }));
            initRow(updatedRows);
            const initProfit = result.detail.reduce(
              (accumulator, sell) =>
                accumulator + sell.total_amount * sell.price_per_kilo,
              0
            );
            result.history.sum_profit = initProfit;
            setSellData(result.history);
            console.log("our rows are", rows);
          }
        }
      });
    }
  }, [activePondId, shouldRefresh]);

  //? Handler
  const handleChangePond = (event) => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    let tempPondId;

    if (name === "farm") {
      const ponds = rowDailyFeeds.get(value);
      if (ponds.length > 0) {
        // setPondlist(ponds);
        setSelectFarm((prevState) => ({
          ...prevState,
          pondName: ponds[0].name,
          pondList: ponds,
        }));
        tempPondId = pondNameMapId.get(ponds[0].name);
      }
    } else {
      tempPondId = pondNameMapId.get(value);
    }
    setSelectFarm((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setSelectFarm((prevState) => ({
      ...prevState,
      pondId: tempPondId,
    }));
  };

  const handleSearchPond = (event) => {
    event.preventDefault();
    setSellData({
      date_issued: "",
      sell_detail: [],
      sum_profit: 0,
    });

    initRow([]);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    // check if same pond or not
    const tempActivePondId =
      pond_name === selectFarm.pondName ? active_pond_id : -1;

    const resetState = (apId, activities) => {
      history.push({
        pathname: "/fillData/sell", // or the current path if needed
        state: {
          farm: selectFarm.farm,
          pond_id: selectFarm.pondId,
          pond_name: selectFarm.pondName,
          active_pond_id: apId,
          activity_id: undefined,
          activities: activities || [],
        },
      });
    };

    const getPondActivity = (apId) => {
      fetchData(
        `${process.env.REACT_APP_BACKEND}/api/v1/activity/getPondActivities?active_pond_id=${apId}`,
        requestOptions
      ).then((result) => {
        if (result) {
          setPondActivities(result);
          setActivePondId(apId);
          // Update location.state with the new values
          resetState(apId, result);
        } else {
          resetState(tempActivePondId);
          setPondActivities([]);
        }
      });
    };

    if (tempActivePondId > 0) getPondActivity(tempActivePondId);
    else {
      let url = `/api/v1/master/getActivePondDetail?pond_id=${selectFarm.pondId}`;
      fetchData(`${process.env.REACT_APP_BACKEND}${url}`, requestOptions).then(
        (result) => {
          if (result) {
            getPondActivity(result.active_pond_id);
          } else {
            resetState();
            setPondActivities([]);
          }
        }
      );
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    let { value, name } = event.target;
    value = value || ""; // Use an empty string as the default value if undefined
    setSellData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const tempActivePondId = active_pond_id || -1;
    const sellId = sellData.sell_id || -1;

    // set sellDetail
    const sellDetail = [];
    for (const detail of rows) {
      detail.total_amount = Number(detail.total_amount);
      detail.price_per_kilo = Number(detail.price_per_kilo);
      detail.date_issued = sellData.date_issued;
      detail.record_status = detail.isShow ? "A" : "S";
      detail.sell_id = sellId;
      if (detail.sell_detail_id > 0 || detail.record_status === "A") {
        sellDetail.push(detail);
      }
    }

    const requestBody = {
      pond_id: selectFarm.pondId,
      active_pond_id: tempActivePondId,
      sell_id: sellId,
      sell_history: {
        sell_id: sellId,
        active_pond_id: tempActivePondId,
        merchant_id: Number(sellData.merchant_id),
        additional_cost: Number(sellData.additional_cost),
        date_issued: `${sellData.date_issued}T00:00:00Z`,
        record_status: "A",
      },
      sell_detail: sellDetail,
    };

    console.log("request body", requestBody);

    // prepare to save in
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    let requestOptions = {
      body: JSON.stringify(requestBody),
      method: "POST",
      headers: headers,
    };

    fetch(
      `${process.env.REACT_APP_BACKEND}/api/v1/activity/saveSellHistory`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("result after save", data.result);
          refreshStateAfterSave(data.result);
        } else {
          console.log(data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    const refreshStateAfterSave = (sellHistory) => {
      // if it's new than new save
      if (sellId < 0)
        pondActivities.unshift({
          activity_id: sellHistory.history.sell_id,
          activity_type: "sell",
          date: changeTimeUTCToThaiDate(sellHistory.history.date_issued),
          detail: `ขายปลา บ่อ ${pond_name}`,
        });
      history.push({
        pathname: "/fillData/sell", // or the current path if needed
        state: {
          farm: selectFarm.farm,
          pond_id: selectFarm.pondId,
          pond_name: selectFarm.pondName,
          active_pond_id: sellHistory.history.active_pond_id,
          activity_id: sellHistory.history.sell_id,
          activities: pondActivities,
        },
      });
    };
  };

  const addRowTable = () => {
    const rowLength = rows.length;
    const data = {
      no: rowLength + 1,
      sell_detail_id: newSellDetailId,
      size: "ปลา 9", // Set an initial value for size
      total_amount: 0, // Set an initial value for total_amount
      price_per_kilo: 0, // Set an initial value for price_per_kilo
      total: 0, // Set an initial value for total
      isShow: true,
    };
    setNewSellDetailId(newSellDetailId - 1);
    initRow([...rows, data]);
  };

  const tableRowRemove = (index) => {
    const dataRow = [...rows];
    dataRow[index].isShow = false;
    const totalProfit = dataRow.reduce((accumulator, sell) => {
      if (sell.isShow) {
        return accumulator + sell.total;
      }
      return accumulator;
    }, 0);

    setSellData((prevState) => ({
      ...prevState,
      sum_profit: totalProfit,
    }));
    initRow(dataRow);
  };

  const onValUpdate = (i, event) => {
    const { name, value } = event.target;
    const data = [...rows];
    data[i][name] = value;
    if (data[i].total_amount && data[i].price_per_kilo) {
      const amount = Number(data[i].total_amount);
      const price = Number(data[i].price_per_kilo);
      data[i].total = amount * price;

      // set total_profit from sell_data
      const totalProfit = data.reduce((accumulator, sell) => {
        if (sell.isShow) {
          return accumulator + sell.total;
        }
        return accumulator;
      }, 0);

      setSellData((prevState) => ({
        ...prevState,
        sum_profit: totalProfit,
      }));
    }
    initRow(data);
  };

  return (
    <div>
      <div className="header">กิจกรรมบ่อ 3/2</div>
      <hr />
      <div className="row">
        <div className="col-6">
          <SelectActivity
            act={"sell"}
            farm={farm}
            pond_id={pond_id}
            pond_name={pond_name}
            active_pond_id={active_pond_id}
            activity_id={activity_id}
            activities={activities}
          />

          <form onSubmit={handleSubmit}>
            <div className="">
              <table
                className="text-center table table-borderless"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td className="text-end pe-1 pt-2">
                      <label htmlFor="date">วันที่ลงปลา:</label>
                    </td>
                    <td className="text-start">
                      <input
                        type="date"
                        name="date_issued"
                        id="date_issued"
                        className="form-control form-control-sm"
                        style={{ width: "125px" }}
                        value={sellData.date_issued}
                        onChange={handleChange}
                      />
                    </td>
                    <td className="text-end  pt-2">
                      <label htmlFor="date">ค่าใช้จ่าย:</label>
                    </td>
                    <td className="text-start">
                      <input
                        type="text"
                        name="additional_cost"
                        id="additional_cost"
                        className="form-control form-control-sm"
                        style={{ width: "80px" }}
                        value={sellData.additional_cost}
                        onChange={handleChange}
                      />
                    </td>
                    <td className="text-end  pt-2">
                      <label htmlFor="date">คนซื้อ:</label>
                    </td>
                    <td className="text-start">
                      <select
                        name="merchant_id"
                        id="merchant_id"
                        className="form-select form-select-sm"
                        style={{ width: "80px" }}
                        onChange={handleChange}
                        value={sellData.merchant_id}
                      >
                        {Object.entries(merchantNameById).map(([id, name]) => (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
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
                        onClick={(e) => {
                          if (e.target === e.currentTarget) {
                            e.preventDefault();
                            addRowTable();
                          }
                        }}
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
                        value={sellData.sum_profit}
                        name="sum_profit"
                        className="form-control"
                        onChange={handleChange}
                        disabled
                      />
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ height: "20px" }}></div>
            <button className="btn btn-primary btn-sm">บันทึก</button>
            <Link
              to={{
                pathname: `/fillData/sell`,
                state: {
                  farm: selectFarm.farm,
                  pond_id: selectFarm.pondId,
                  pond_name: selectFarm.pondName,
                  active_pond_id: activePondId,
                  activity_id: activity_id,
                  activities: pondActivities,
                },
              }}
              className="btn btn-warning ms-1 btn-sm"
              onClick={() => setShouldRefresh(true)}
            >
              ยกเลิก
            </Link>
            <Link
              to="#!"
              className="btn btn-danger ms-1 btn-sm ps-3 pe-3"
              onClick={() => console.log("not implement")}
            >
              ลบ
            </Link>
          </form>
        </div>
        <div className="col">
          <div className="text-end select-date mb-4">
            <form onSubmit={handleSearchPond}>
              <SearchFarm
                onChange={handleChangePond}
                property_pond={selectFarm}
              />
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
                {console.log("pond_activities", pondActivities)}
                {pondActivities.slice(0, 6).map((activity, index) => (
                  <Fragment key={index}>
                    <tr>
                      <td>{activity.date}</td>
                      <td>
                        <span
                          className={
                            activity.activity_type === "sell" &&
                            activity.activity_id === activity_id
                              ? "bg-info"
                              : ""
                          }
                        >
                          {activity.activity_type === "move"
                            ? activity.detail
                            : activityDictionaryMap.get(activity.activity_type)}
                        </span>
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: `/fillData/${activity.activity_type}`,
                            state: {
                              farm: selectFarm.farm,
                              pond_id: selectFarm.pondId,
                              pond_name: selectFarm.pondName,
                              active_pond_id: activePondId,
                              activity_id: activity.activity_id,
                              activities: pondActivities,
                            },
                          }}
                          className="link-dark"
                          onClick={() => setShouldRefresh(true)}
                        >
                          แก้ไข
                        </Link>
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitySell;
