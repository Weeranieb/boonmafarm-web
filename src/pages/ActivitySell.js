import { Fragment, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import SearchFarm from "../ui-components/SearchFarm";
import "./Activity.css";
import "./General.css";
import { fetchData } from "../utils/fetch";
import TableRows from "../components/TableRows";
import SelectActivity from "../ui-components/SelectActivity";
import { pondNameMapId, rowDailyFeeds } from "../utils/pond";
import { activityDictionaryMap } from "../utils/activity";

const ActivitySell = () => {
  const history = useHistory();
  const location = useLocation();
  const { farm, pond_id, pond_name, active_pond_id, activity_id, activities } =
    location.state ?? {};
  let newSellId = -1;

  //set state
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
    date_issued: "",
    // sell_detail: [],  devide into two part
    sum_profit: 0,
  });

  //  {
  //   index:-1,
  //   size:"",
  //   total_amount:0,
  //   price_per_kilo:0,
  //   profit: 0,
  // }

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

  const addRowTable = () => {
    const rowLength = rows.length;
    const data = {
      no: rowLength + 1,
      sell_id: newSellId,
      size: "", // Set an initial value for size
      total_amount: 0, // Set an initial value for total_amount
      price_per_kilo: 0, // Set an initial value for price_per_kilo
      total: 0, // Set an initial value for total
    };
    newSellId--;
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
    if (data[i].total_amount && data[i].price_per_kilo) {
      const amount = Number(data[i].total_amount);
      const price = Number(data[i].price_per_kilo);
      data[i].total = amount * price;

      // set total_profit from sell_data
    }
    initRow(data);
    console.log("rows are here", rows);
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
                {pondActivities.slice(0, 6).map((activity, index) => (
                  <Fragment key={index}>
                    <tr>
                      <td>{activity.date}</td>
                      <td>
                        <span
                          className={
                            activity.activity_type === "fill" &&
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
