import SearchFarm from "../ui-components/SearchFarm";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./Activity.css";
import "./General.css";
import { Fragment, useEffect, useState } from "react";
import { pondNameMapId, rowDailyFeeds } from "../utils/pond";
import { fetchData } from "../utils/fetch";
import SelectActivity from "../ui-components/SelectActivity";
import { activityDictionaryMap } from "../utils/activity";
import { changeTimeUTCToThaiDate } from "../utils/date";

// TODO 1. add warning when fill is not enough and not save until fulfill
// TODO 2. send state value to another page in fillData
const ActivityFill = () => {
  const history = useHistory();
  const location = useLocation();
  const { farm, pond_id, pond_name, active_pond_id, activity_id, activities } =
    location.state ?? {};
  // set state
  const [selectFarm, setSelectFarm] = useState({
    farm: farm ?? "ฟาร์ม 1",
    pondName: pond_name ?? "1ซ้าย",
    pondId: pond_id ?? 1,
    pondList: farm ? rowDailyFeeds.get(farm) : rowDailyFeeds.get("ฟาร์ม 1"),
  });
  const [pondActivities, setPondActivities] = useState(activities || []);
  const [activePondId, setActivePondId] = useState(active_pond_id ?? -1);
  const [shouldRefresh, setShouldRefresh] = useState(false);
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

  useEffect(() => {
    if (shouldRefresh) {
      window.location.reload();
    }
    let fillId = fillData.fill_in_id;
    if (fillId > 0 && activePondId > 0) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      fetchData(
        `${process.env.REACT_APP_BACKEND}/api/v1/activity/getFillHistory?active_pond_id=${activePondId}&fill_in_id=${fillId}`,
        requestOptions
      ).then((result) => {
        if (result) {
          if (result.error) console.log(result.error);
          else {
            result.date_issued = result.date_issued.substring(0, 10);
            result.cost =
              result.amount * result.price_per_unit * result.weight_per_fish +
              (result.additional_cost || 0);
            setFillData(result);
          }
        }
      });
    }
  }, [activePondId, shouldRefresh]);

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

    // check if same pond or not
    const tempActivePondId =
      pond_name === selectFarm.pondName ? active_pond_id : -1;

    const resetState = (apId, activities) => {
      history.push({
        pathname: "/fillData/fill", // or the current path if needed
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
    let value = event.target.value;
    let name = event.target.name;
    value = value || ""; // Use an empty string as the default value if undefined
    setFillData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const amount = Number(fillData.amount);
    const price_per_unit = Number(fillData.price_per_unit);
    const weight_per_fish = Number(fillData.weight_per_fish);
    const additional_cost = Number(fillData.additional_cost);

    const tempActivePondId = active_pond_id || -1;

    const cost = amount * price_per_unit * weight_per_fish + additional_cost;
    setFillData((prevState) => ({
      ...prevState,
      amount,
      price_per_unit,
      weight_per_fish,
      additional_cost,
      cost,
    }));
    console.log(fillData);
    // passed validation, so save changes
    console.log(activePondId);
    const fillInId = fillData.fill_in_id || -1;
    const requestBody = {
      pond_id: selectFarm.pondId,
      active_pond_id: tempActivePondId,
      fill_in_id: fillInId,
      fill_history: {
        fill_in_id: fillInId,
        active_pond_id: tempActivePondId,
        amount: amount,
        weight_per_fish: weight_per_fish,
        price_per_unit: price_per_unit,
        fish_unit: "kilogram",
        additional_cost: additional_cost,
        date_issued: `${fillData.date_issued}T00:00:00Z`,
        record_status: "A",
      },
    };

    console.log(requestBody);
    console.log(pondActivities);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    let requestOptions = {
      body: JSON.stringify(requestBody),
      method: "POST",
      headers: headers,
    };

    fetch(
      `${process.env.REACT_APP_BACKEND}/api/v1/activity/saveFillHistory`,
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

    const refreshStateAfterSave = (fillHistory) => {
      if (fillInId < 0)
        pondActivities.unshift({
          activity_id: fillHistory.fill_in_id,
          activity_type: "fill",
          date: changeTimeUTCToThaiDate(fillHistory.date_issued),
          detail: `เติมปลา บ่อ ${pond_name}`,
        });
      history.push({
        pathname: "/fillData/fill", // or the current path if needed
        state: {
          farm: selectFarm.farm,
          pond_id: selectFarm.pondId,
          pond_name: selectFarm.pondName,
          active_pond_id: fillHistory.active_pond_id,
          activity_id: fillHistory.fill_in_id,
          activities: pondActivities,
        },
      });
    };
  };

  return (
    <div>
      <div className="header">กิจกรรมบ่อ {pond_name || "1ซ้าย"}</div>
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
                      <label htmlFor="date_issued">วันที่ลงปลา:</label>
                    </td>
                    <td className="text-start">
                      <input
                        type="date"
                        name="date_issued"
                        id="date_issued"
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
            <button className="btn btn-primary btn-sm">บันทึก</button>
            <Link
              to={{
                pathname: `/fillData/fill`,
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
