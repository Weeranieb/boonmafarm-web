import "./OnePond.css";
import { Fragment, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { formatNumberWithCommas } from "../utils/number";
import { thaiMonths } from "../utils/date";

const OnePond = () => {
  // we need to get the "prop" passed to this component
  const location = useLocation();
  const activePondId = location.state?.active_pond_id;
  console.log(location.state);

  // set stateful variables
  const [activePond, setActivePond] = useState({});
  const [totalFeed, setTotalFeed] = useState(0);
  const [activities, setActivities] = useState([]);
  const [histories, setHistories] = useState([]);
  const [canCreateNewPond, setCanCreateNewPond] = useState(false);

  useEffect(() => {
    const fetchActivePondDetail = async () => {
      try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const requestOptions = {
          method: "GET",
          headers: headers,
        };

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/api/v1/master/getActivePondDetail?active_pond_id=${activePondId}`,
          requestOptions
        );
        const data = await response.json();
        if (data.result) {
          setActivePond(data.result);
          fetchPondHistories(data.result.pond_id);
        } else {
          console.log(data.error);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchPondHistories = async (pondId) => {
      try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const requestOptions = {
          method: "GET",
          headers: headers,
        };

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/api/v1/master/getPondHistories?pond_id=${pondId}`,
          requestOptions
        );
        const data = await response.json();
        if (data.result) {
          setHistories(data.result.histories);
          setCanCreateNewPond(data.result.is_all_close);
        } else {
          console.log(data.error);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchTotalFeed = async () => {
      try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const requestOptions = {
          method: "GET",
          headers: headers,
        };

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/api/v1/feed/getTotalFeed?active_pond_id=${activePondId}`,
          requestOptions
        );
        const data = await response.json();
        if (data.result) {
          setTotalFeed(data.result);
        } else {
          console.log(data.error);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchPondActivities = async () => {
      try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const requestOptions = {
          method: "GET",
          headers: headers,
        };

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/api/v1/activity/getPondActivities?active_pond_id=${activePondId}`,
          requestOptions
        );
        const data = await response.json();
        if (data.result) {
          setActivities(data.result);
        } else {
          console.log(data.error);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchActivePondDetail();
    fetchTotalFeed();
    fetchPondActivities();
  }, [activePondId]);

  //TODO should be util in the future
  const date = new Date(activePond.start_date);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear() + 543;

  let diffDay;
  if (activePond.end_date) {
    let day2 = new Date(activePond.end_date);
    const timeDiff = day2.getTime() - date.getTime();

    // Convert milliseconds to days
    diffDay = Math.floor(timeDiff / (1000 * 3600 * 24));
  } else {
    let today = new Date();
    const timeDiff = today - date;

    // Convert milliseconds to days
    diffDay = Math.floor(timeDiff / (1000 * 3600 * 24));
  }

  const thaiDate = `${day} ${thaiMonths[monthIndex]} ${year}`;

  // payload for refractor
  const mainDetail = {
    จำนวนวัน: `${diffDay} วัน`,
    วันที่เริ่มเลี้ยง: thaiDate,
    จำนวนเหยื่อสด: `${totalFeed} ลัง`,
    ต้นทุน: `${formatNumberWithCommas(Math.round(activePond.cost))} ฿`,
    กำไรสุทธิ: `${formatNumberWithCommas(Math.round(activePond.profit))} ฿`,
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <div className="container">
            <div className="row">
              <div className="col text-center" style={{ fontSize: "35px" }}>
                {activePond.pond_name}
                {/* บ่อ: {activePond.pond_name.slice(4)} */}
              </div>
              <div
                className="col-9 d-flex align-items-start justify-content-between align-bottom"
                style={{ position: "relative", top: "8px" }}
              >
                <span className="btn btn-warning">
                  {activePond.is_close === "N" ? "ปัจจุบันเลี้ยง" : "ปิดบ่อ"}
                </span>
                {canCreateNewPond && (
                  <Link
                    to={{
                      pathname: `/fillData/fill`,
                      state: {
                        farm: activePond.farm,
                        pond_id: activePond.pond_id,
                        pond_name: activePond.pond_name,
                      },
                    }}
                    className="btn btn-outline-secondary ms-1"
                  >
                    เปิดบ่อ
                  </Link>
                )}
              </div>
            </div>
          </div>
          <table className="table table-borderless text-center margin-top">
            <tbody>
              <tr>
                {Object.entries(mainDetail).map(([header, detail]) => (
                  <td>
                    <span className="line-height fw-bold">{header}</span>
                    <br />
                    {detail}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <div style={{ height: "40px" }}></div>
          <div className="chart-header">
            เลือกกราฟ:
            <span className="border border-dark p-1 ms-4">
              เปรียบเทียบต้นทุนทั้งหมด
            </span>
          </div>

          <div className="mt-4 ms-5">
            <img
              src="https://uicdn.toast.com/toastui/img/tui-chart_mobile.png"
              alt=""
              width="710px"
              height="400px"
            />
          </div>
        </div>
        <div className="col">
          <div className="text-center farm-header text-dark mb-4">
            {activePond.farm}
          </div>
          <div
            className="border border-2 rounded rounded-3 p-2 justify-content-between"
            style={{ height: "270px" }}
          >
            <div className="d-flex justify-content-between">
              <div className="box-header">กิจกรรมล่าสุด</div>
              <div className="text-primary watch-all">ดูทั้งหมด</div>
            </div>
            <table className="table" style={{ width: "100%" }}>
              <tbody>
                {activities.slice(0, 5).map((act, index) => (
                  <Fragment key={index}>
                    <tr>
                      <td style={{ width: "45%", verticalAlign: "middle" }}>
                        {act.date}
                      </td>
                      <td
                        style={{
                          width: "55%",
                          verticalAlign: "middle",
                          textAlign: "center",
                        }}
                      >
                        <Link
                          to={{
                            pathname: `/fillData/${act.activity_type}`,
                            state: {
                              farm: activePond.farm,
                              pond_id: activePond.pondId,
                              pond_name: activePond.pondName,
                              active_pond_id: activePondId,
                              activity_id: act.activity_id,
                              activities: activities,
                            },
                          }}
                          className="text-decoration-none text-dark"
                          style={{
                            fontWeight: "bolder",
                            whiteSpace: "pre-line",
                          }}
                        >
                          {act.detail}
                        </Link>
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="border border-2 round rounded-3 p-2 mt-3"
            style={{ height: "270px" }}
          >
            <div className="d-flex justify-content-between">
              <div className="box-header">ประวัติบ่อ</div>
              <div className="text-primary watch-all">ดูทั้งหมด</div>
            </div>
            <table className="table text-center">
              <tbody>
                {histories.slice(0, 5).map((his) => (
                  <Fragment key={his.active_pond_id}>
                    <tr>
                      <td
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <Link
                          to={{
                            pathname: "/pondDetail",
                            state: {
                              active_pond_id: his.active_pond_id,
                            },
                          }}
                          className="text-decoration-none text-dark"
                          style={{
                            fontWeight: "bolder",
                          }}
                        >
                          {his.range}
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

export default OnePond;
