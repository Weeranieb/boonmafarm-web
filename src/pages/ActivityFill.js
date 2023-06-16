import SearchFarm from "../ui-components/SearchFarm";
import { Link, useLocation } from "react-router-dom";
import "./Activity.css";
import "./General.css";
import { Fragment, useState } from "react";
import { pondNameMapId, rowDailyFeeds } from "../utils/pond";
import { fetchData } from "../utils/fetch";
import SelectActivity from "../ui-components/SelectActivity";
import { activityDictionaryMap } from "../utils/activity";

const ActivityFill = () => {
  const location = useLocation();
  const { farm, pond_id, pond_name, active_pond_id, activity_id } =
    location.state ?? {};
  console.log(
    "state value",
    farm,
    pond_id,
    pond_name,
    active_pond_id,
    activity_id
  );
  // set state
  const [selectFarm, setSelectFarm] = useState({
    farm: farm ?? "ฟาร์ม 1",
    pondName: pond_name ?? "1ซ้าย",
    pondId: pond_id ?? 1,
  });
  const [pondlist, setPondlist] = useState(rowDailyFeeds.get("ฟาร์ม 1"));
  // const [pondId, setPondId] = useState(pond_id ?? 1);
  const [pondActivities, setPondActivities] = useState([]);
  const [activePondId, setActivePondId] = useState(active_pond_id ?? -1);
  // set stateful variables
  const [fillData, setFillData] = useState({
    fill_in_id: activity_id ?? -1,
    date_issued: "",
    amount: 0,
    weight_per_fish: 0,
    price_per_unit: 0,
    additional_cost: 0,
    cost: 0,
  });

  // useEffect(() => {
  //   let fillId = fillData.fill_in_id;
  //   setPondlist(rowDailyFeeds.get(fillData.farm));
  //   console.log(fillData, activePondId);
  //   if (fillId > 0 && activePondId > 0) {
  //     const headers = new Headers();
  //     headers.append("Content-Type", "application/json");

  //     const requestOptions = {
  //       method: "GET",
  //       headers: headers,
  //     };

  //     fetchData(
  //       `${process.env.REACT_APP_BACKEND}/api/v1/activity/getFillHistory?active_pond_id=${activePondId}&fill_in_id=${fillId}`,
  //       requestOptions
  //     ).then((result) => {
  //       if (result) {
  //         console.log(result);
  //         if (result.error) console.log(result.error);
  //         else {
  //           result.date_issued = result.date_issued.substring(0, 10);
  //           setFillData(result);
  //         }
  //       }
  //     });
  //   }
  // }, [activePondId, farm]);

  const handleChangePond = (event) => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    let tempPondId;

    if (name === "farm") {
      const ponds = rowDailyFeeds.get(value);
      if (ponds.length > 0) {
        setPondlist(ponds);
        setSelectFarm((prevState) => ({
          ...prevState,
          pondName: ponds[0].name,
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
    setFillData({
      date_issued: "",
      amount: 0,
      weight_per_fish: 0,
      price_per_unit: 0,
      additional_cost: 0,
      cost: 0,
    });

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    const getPondActivity = (tempActivePondId) => {
      fetchData(
        `${process.env.REACT_APP_BACKEND}/api/v1/activity/getPondActivities?active_pond_id=${tempActivePondId}`,
        requestOptions
      ).then((result) => {
        if (result) {
          setPondActivities(result);
          setActivePondId(tempActivePondId);
        }
      });
    };

    if (active_pond_id) getPondActivity(active_pond_id);
    else {
      let url = `/api/v1/master/getActivePondDetail?pond_id=${selectFarm.pondId}`;

      fetchData(`${process.env.REACT_APP_BACKEND}${url}`, requestOptions).then(
        (result) => {
          if (result) {
            getPondActivity(result.active_pond_id);
          }
        }
      );
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    let value = event.target.value;
    let name = event.target.name;
    let type = event.target.type;
    console.log("every thing should be fine", value, name, type);
    if (type === "text") value = Number(value);
    value = value || ""; // Use an empty string as the default value if undefined
    setFillData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform any necessary processing or data manipulation here
    // You can access the form data from the `fillData` state variable
    const cost =
      fillData.amount * fillData.price_per_unit * fillData.weight_per_fish +
      fillData.additional_cost;
    setFillData((prevState) => ({
      ...prevState,
      cost,
    }));
  };

  // useEffect();

  return (
    <div>
      <div className="header">กิจกรรมบ่อ 3/2</div>
      <hr />
      <div className="row">
        <div className="col-6">
          <SelectActivity act={"fill"} />
          <form onSubmit={handleSubmit}>
            <div className="input">
              <table
                className="text-center table table-borderless"
                width="100%"
              >
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
                        value={fillData.date_issued}
                        className="form-control form-control-sm"
                        style={{ width: "185px" }}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-end pe-4">
                      <label htmlFor="amount">จำนวนปลาที่ลง:</label>
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
                    <td className="text-end pe-4">
                      <label htmlFor="weight_per_fish">น้ำหนักปลาต่อตัว:</label>
                    </td>
                    <td className="text-start">
                      <input
                        type="text"
                        name="weight_per_fish"
                        inputMode="numeric"
                        id="weight_per_fish"
                        value={fillData.weight_per_fish}
                        className="form-control form-control-sm"
                        style={{ width: "185px" }}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-end pe-4">
                      <label htmlFor="price_per_unit">ราคาปลา:</label>
                    </td>
                    <td className="text-start">
                      <input
                        type="text"
                        name="price_per_unit"
                        inputMode="numeric"
                        id="price_per_unit"
                        value={fillData.price_per_unit}
                        className="form-control form-control-sm"
                        style={{ width: "185px" }}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-end pe-4">
                      <label htmlFor="additional_cost">ค่าใช้จ่าย:</label>
                    </td>
                    <td className="text-start">
                      <input
                        type="text"
                        name="additional_cost"
                        inputMode="numeric"
                        id="additionalCost"
                        value={fillData.additional_cost}
                        className="form-control form-control-sm"
                        style={{ width: "185px" }}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-end pe-4">
                      <label htmlFor="cost">ต้นทุน:</label>
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
          </form>
        </div>
        <div className="col">
          <div className="text-end select-date mb-4">
            <form onSubmit={handleSearchPond}>
              <SearchFarm
                onChange={handleChangePond}
                property_pond={selectFarm}
                pondList={pondlist}
              />
            </form>
          </div>
          <div className="border border-2 rounded rounded-3 p-2 justify-content-between">
            <div className="d-flex justify-content-between p-3">
              <div className="box-header">กิจกรรมล่าสุด</div>
              {pondActivities.length > 5 && (
                <div className="text-primary watch-all">ดูทั้งหมด</div>
              )}
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
                        {activityDictionaryMap.get(activity.activity_type)}
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
                            },
                          }}
                          className="link-dark"
                        >
                          แก้ไข
                        </Link>
                      </td>
                    </tr>
                  </Fragment>
                ))}
                {pondActivities.length === 0 && (
                  <tr style={{ height: "40px" }}></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFill;
