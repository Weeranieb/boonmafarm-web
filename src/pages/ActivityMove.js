import SearchFarm from "../ui-components/SearchFarm";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import "./Activity.css";
import "./General.css";
import { fetchData } from "../utils/fetch";
import SelectActivity from "../ui-components/SelectActivity";
import {
  pondNameMapId,
  rowDailyFeeds,
  swappedPondNameMap,
} from "../utils/pond";
import { activityDictionaryMap } from "../utils/activity";
import SearchFarmNoSearch from "../ui-components/SearchFarmNoSearch";

// FIXME need use state to download data and send state to_prefix
const ActivityMove = () => {
  const history = useHistory();
  const location = useLocation();
  const {
    farm,
    to_farm,
    pond_id,
    to_pond_id,
    pond_name,
    to_pond_name,
    active_pond_id,
    activity_id,
    activities,
  } = location.state ?? {};

  console.log(
    "this page states are",
    farm,
    to_farm,
    pond_id,
    to_pond_id,
    pond_name,
    to_pond_name,
    active_pond_id,
    activity_id,
    activities
  );

  // set state
  const [selectFarmAndPond, setSelectFarmAndPond] = useState({
    farm: farm ?? "ฟาร์ม 1",
    pondName: pond_name ?? "1ซ้าย",
    pondId: pond_id ?? 1,
    pondList: farm ? rowDailyFeeds.get(farm) : rowDailyFeeds.get("ฟาร์ม 1"),
  });

  const [selectToPond, setSelectToPond] = useState({
    farm: to_farm ?? "ฟาร์ม 1",
    pondName: to_pond_name ?? "1ซ้าย",
    pondId: to_pond_id ?? 1,
    pondList: to_farm
      ? rowDailyFeeds.get(to_farm)
      : rowDailyFeeds.get("ฟาร์ม 1"),
  });

  const [pondActivities, setPondActivities] = useState(activities || []);
  const [activePondId, setActivePondId] = useState(active_pond_id ?? -1);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  // set stateful variables
  const [moveData, setMoveData] = useState({
    move_id: activity_id ?? -1,
    date_issued: "",
    to_farm: "",
    to_pond_name: "",
    fish_amount: 0,
    weight_per_fish: 0,
    price_per_kilo: 0,
    additional_cost: 0,
  });

  useEffect(() => {
    if (shouldRefresh) {
      window.location.reload();
    }
    let moveId = moveData.move_id;
    if (moveId > 0 && activePondId > 0) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      const getFarmAndPondId = (activePondId) => {
        return new Promise((resolve, reject) => {
          fetchData(
            `${process.env.REACT_APP_BACKEND}/api/v1/master/getActivePondDetail?active_pond_id=${activePondId}`,
            requestOptions
          )
            .then((result) => {
              if (result) {
                if (result.error) {
                  console.log(result.error);
                  reject(result.error);
                } else {
                  resolve([result.farm, result.pond_name]);
                }
              }
            })
            .catch((error) => {
              console.log(error);
              reject(error);
            });
        });
      };

      fetchData(
        `${process.env.REACT_APP_BACKEND}/api/v1/activity/getMoveHistory?active_pond_id=${activePondId}&move_id=${moveId}`,
        requestOptions
      ).then((result) => {
        if (result) {
          if (result.error) {
            console.log(result.error);
          } else {
            // set farm property
            result.date_issued = result.date_issued.substring(0, 10);
            getFarmAndPondId(result.to_pond_id)
              .then(([tempFarm, tempPondName]) => {
                result.to_farm = tempFarm;
                result.to_pond_name = swappedPondNameMap.get(tempPondName);
                console.log(tempPondName);
                console.log("result from search", result);
                setMoveData(result);
              })
              .catch((error) => {
                console.log(error);
              });
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
        setSelectFarmAndPond((prevState) => ({
          ...prevState,
          pondName: ponds[0].name,
          pondList: ponds,
        }));
        tempPondId = pondNameMapId.get(ponds[0].name);
      }
    } else {
      tempPondId = pondNameMapId.get(value);
    }
    setSelectFarmAndPond((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setSelectFarmAndPond((prevState) => ({
      ...prevState,
      pondId: tempPondId,
    }));
  };

  const handleChange = (event) => {
    event.preventDefault();
    let value = event.target.value;
    let name = event.target.name;
    value = value || ""; // Use an empty string as the default value if undefined
    setMoveData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchPond = (event) => {
    event.preventDefault();
    console.log(selectFarmAndPond);
    setMoveData({
      move_id: activity_id ?? -1,
      date_issued: "",
      to_pond_id: 0,
      fish_amount: 0,
      weight_per_fish: 0,
      price_per_kilo: 0,
      additional_cost: 0,
    });

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    // check if same pond or not
    const tempActivePondId =
      pond_name === selectFarmAndPond.pondName ? active_pond_id : -1;

    // Update location.state with the new values
    const resetState = (apId, activities) => {
      history.push({
        pathname: "/fillData/move", // or the current path if needed
        state: {
          farm: selectFarmAndPond.farm,
          to_farm: undefined,
          pond_id: selectFarmAndPond.pondId,
          pond_name: selectFarmAndPond.pondName,
          to_pond_name: undefined,
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
          resetState(apId, result);
        } else {
          resetState(tempActivePondId);
          setPondActivities([]);
        }
      });
    };

    if (tempActivePondId > 0) getPondActivity(tempActivePondId);
    else {
      let url = `/api/v1/master/getActivePondDetail?pond_id=${selectFarmAndPond.pondId}`;
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

  // need to change move Data property
  const handleChangeToPond = (event) => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    let tempPondId;

    if (name === "farm") {
      const ponds = rowDailyFeeds.get(value);
      if (ponds.length > 0) {
        // setPondlist(ponds);
        setSelectToPond((prevState) => ({
          ...prevState,
          pondName: ponds[0].name,
          pondList: ponds,
        }));
        tempPondId = pondNameMapId.get(ponds[0].name);
      }
    } else {
      tempPondId = pondNameMapId.get(value);
    }
    setSelectToPond((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setSelectToPond((prevState) => ({
      ...prevState,
      pondId: tempPondId,
    }));

    console.log(selectToPond);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectToPond);
  };

  return (
    <div>
      <div className="header">กิจกรรมบ่อ 3/2</div>
      <hr />
      <div className="row">
        <div className="col-6">
          <SelectActivity act={"move"} />
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
                        className="form-control form-control-sm"
                        style={{ width: "185px" }}
                        onChange={handleChange}
                        value={moveData.date_issued}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-end pe-4" style={{ width: "30%" }}>
                      บ่อที่ย้ายลง:
                    </td>
                    <td className="text-start">
                      <SearchFarmNoSearch
                        onChange={handleChangeToPond}
                        property_pond={selectToPond}
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
                        name="fish_amount"
                        inputMode="numeric"
                        id="fish_amount"
                        className="form-control form-control-sm"
                        style={{ width: "185px" }}
                        onChange={handleChange}
                        value={moveData.fish_amount}
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
                        name="weight_per_fish"
                        inputMode="numeric"
                        id="weight_per_fish"
                        className="form-control form-control-sm"
                        style={{ width: "185px" }}
                        onChange={handleChange}
                        value={moveData.weight_per_fish}
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
                        name="price_per_kilo"
                        inputMode="numeric"
                        id="price_per_kilo"
                        className="form-control form-control-sm"
                        style={{ width: "185px" }}
                        onChange={handleChange}
                        value={moveData.additional_cost}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-end pe-4" style={{ width: "30%" }}>
                      ค่าใช้จ่าย:
                    </td>
                    <td className="text-start">
                      <input
                        type="text"
                        name="additional_cost"
                        inputMode="numeric"
                        id="additional_cost"
                        className="form-control form-control-sm"
                        style={{ width: "185px" }}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ height: "20px" }}></div>
            <button className="btn btn-primary btn-sm ps-2 pe-2">บันทึก</button>
            <Link to="#!" className="btn btn-warning ms-1 btn-sm">
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
                property_pond={selectFarmAndPond}
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
                        {activityDictionaryMap.get(activity.activity_type)}
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: `/fillData/${activity.activity_type}`,
                            state: {
                              farm: selectFarmAndPond.farm,
                              pond_id: selectFarmAndPond.pondId,
                              pond_name: selectFarmAndPond.pondName,
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

export default ActivityMove;
