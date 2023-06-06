import { Fragment, useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [lastUpdate, setLastUpdate] = useState("");
  const [latestActivities, setLatestActivities] = useState([]);
  const [profits, setProfits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    const fetchData = async (url) => {
      try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        return data.result;
      } catch (error) {
        setError(error);
        return null;
      }
    };

    fetchData(
      `${process.env.REACT_APP_BACKEND}/api/v1/activity/getLatestUpdate`
    ).then((result) => {
      if (result) {
        setLastUpdate(result);
      }
    });

    fetchData(
      `${process.env.REACT_APP_BACKEND}/api/v1/activity/getLatestActivity`
    ).then((result) => {
      if (result) {
        setLatestActivities(result);
      }
    });

    fetchData(
      `${process.env.REACT_APP_BACKEND}/api/v1/master/getTopYearlyProfit`
    ).then((result) => {
      if (result) {
        setProfits(result);
      }
    });
  }, []);

  if (error) {
    // Handle the error here, e.g., display an error message
    return <div>Error: {error.message}</div>;
  }

  // const routeMap = new Map(
  //   ["fill", "fillIn"],
  //   ["move", "move"],
  //   ["sell", "sell"]
  // );

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    numberingSystem: "thai",
  };

  const thaiDate = lastUpdate.toLocaleString("th-TH", options);
  // console.log(thaiDate, latestActivities, profits);
  return (
    <Fragment>
      <div className="greet">ยินดีต้อนรับสู่ บุญมาฟาร์ม</div>
      <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <div className="col">
          <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">เพิ่มข้อมูลครั้งล่าสุด</h4>
            </div>
            <div className="card-body">
              <h4 className="card-title pricing-card-title">
                <small className="text-muted fw-light">{thaiDate}</small>
              </h4>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">กิจกรรมล่าสุด</h4>
            </div>
            <div className="card-body text-align-left">
              <table className="table">
                <tbody>
                  {latestActivities.map((g, index) => (
                    <Fragment>
                      {/* eslint-disable-next-line react/no-array-index-key */}
                      <tr>
                        <td style={{ verticalAlign: "middle" }}>{g.date}</td>
                        <td style={{ verticalAlign: "middle" }}>
                          <Link
                            key={index}
                            to={`/fillData/${g.activity_type}`}
                            className="text-decoration-none text-dark"
                            style={{
                              fontWeight: "bolder",
                              whiteSpace: "pre-line",
                            }}
                            state={{
                              activity_id: g.activity_id,
                            }}
                          >
                            {g.detail}
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
        <div className="col">
          <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">อันดับกำไรมากสุด/ปี</h4>
            </div>
            <div className="card-body">
              <table className="table">
                <tbody>
                  {profits.map((profit, index) => (
                    <Fragment>
                      {/* eslint-disable-next-line react/no-array-index-key */}
                      <tr>
                        <td>{`${index + 1}.`}</td>
                        <td style={{ verticalAlign: "middle" }}>
                          <Link
                            key={index}
                            to="/pondDetail"
                            className="text-decoration-none text-dark"
                            style={{ fontWeight: "bolder" }}
                            state={{
                              active_pond_id: profit.active_pond_id,
                            }}
                          >
                            {profit.pond_name}
                          </Link>
                        </td>
                        <td style={{ verticalAlign: "middle" }}>
                          {profit.detail}
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
      <div className="position-absolute bottom-0 end-0 text-muted update">
        อัปเดทล่าสุด: 9 ธันวาคม 2541
      </div>
    </Fragment>
  );
};

export default Home;
