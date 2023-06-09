import "./Ponds.css";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../utils/fetch";
import { swappedPondNameMap } from "../utils/pond";

const Ponds = () => {
  const linkMap = new Map();
  const [pondData, setPondData] = useState([]);

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetchData(
      `${process.env.REACT_APP_BACKEND}/api/v1/master/getListOfPonds`,
      requestOptions
    ).then((result) => {
      if (result) {
        setPondData(result);
      }
    });
  }, []);

  console.log(pondData);

  for (const pond of pondData) {
    const pondName = swappedPondNameMap.get(pond.pond_name);
    let state, pathName;
    if (pond.active_pond_id === -1) {
      pathName = "/fillData/fill";
      state = {
        pond_id: pond.pond_id,
        pond_name: pond.pond_name,
      };
    } else {
      pathName = "/pondDetail";
      state = {
        active_pond_id: pond.active_pond_id,
      };
    }
    linkMap.set(
      pondName,
      <Link
        to={{ pathname: pathName, state }}
        className="text-decoration-none text-dark"
        style={{ fontWeight: "bolder" }}
      >
        {pondName}
      </Link>
    );
  }

  console.log(linkMap);

  return (
    <Fragment>
      <div className="pond-header">บ่อปลาทั้งหมด</div>
      <div className="container">
        <div className="row">
          <div className="col-sm text-center">
            <span className="farm-header text-dark">ฟาร์ม 1</span>
            <table className="table margin-pond table-borderless">
              <tbody>
                <tr className="table-height">
                  <td>{linkMap.get("1 ซ้าย")}</td>
                  <td>{linkMap.get("1 กลาง")}</td>
                  <td>{linkMap.get("1 ขวา")}</td>
                </tr>
                <tr className="table-height">
                  <td>{linkMap.get("2 ซ้าย")}</td>
                  <td>{linkMap.get("2 กลาง")}</td>
                  <td>{linkMap.get("2 ขวา")}</td>
                </tr>
                <tr className="table-height">
                  <td>{linkMap.get("3 ซ้าย")}</td>
                  <td>{linkMap.get("3 กลาง")}</td>
                  <td>{linkMap.get("3 ขวา")}</td>
                </tr>
                <tr className="table-height">
                  <td>{linkMap.get("4 ซ้าย")}</td>
                  <td>{linkMap.get("4 กลาง")}</td>
                  <td>{linkMap.get("4 ขวา")}</td>
                </tr>
                <tr className="table-height">
                  <td>{linkMap.get("5 ซ้าย")}</td>
                  <td>{linkMap.get("5 กลาง")}</td>
                  <td>{linkMap.get("5 ขวา")}</td>
                </tr>
                <tr className="table-height">
                  <td>{linkMap.get("6 ซ้าย")}</td>
                  <td>{linkMap.get("พักน้ำ")}</td>
                  <td>{linkMap.get("6 ขวา")}</td>
                </tr>
                <tr className="table-height">
                  <td>{linkMap.get("ศญ")}</td>
                  <td>{linkMap.get("หลังครัว")}</td>
                  <td>{linkMap.get("7 ขวา")}</td>
                </tr>
                <tr className="table-height">
                  <td colSpan="1">{linkMap.get("ศล")}</td>
                  <td colSpan="1">{linkMap.get("สนาม")}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm text-center">
            <span className="farm-header text-dark">ฟาร์ม 2</span>
            <table className="table margin-pond table-borderless">
              <tbody>
                <tr className="table-height-2">
                  <td>{linkMap.get("1/1/2")}</td>
                  <td>{linkMap.get("1/2")}</td>
                </tr>
                <tr className="table-height-2">
                  <td>{linkMap.get("2/2")}</td>
                  <td>{linkMap.get("3/2")}</td>
                </tr>
                <tr className="table-height-2">
                  <td>{linkMap.get("4/2")}</td>
                  <td>{linkMap.get("5/2")}</td>
                </tr>
                <tr className="table-height-2">
                  <td>{linkMap.get("6/2")}</td>
                  <td>{linkMap.get("7/2")}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm text-center">
            <span className="farm-header text-dark">ฟาร์ม 4</span>
            <table className="table margin-pond table-borderless">
              <tbody>
                <tr className="table-height-3">
                  <td>{linkMap.get("1/4")}</td>
                  <td>{linkMap.get("2/4")}</td>
                </tr>
                <tr className="table-height-3">
                  <td>{linkMap.get("3/4")}</td>
                  <td>{linkMap.get("4/4")}</td>
                </tr>
                <tr className="table-height-3">
                  <td>{linkMap.get("5/4")}</td>
                  <td>{linkMap.get("6/4")}</td>
                </tr>
                <tr className="table-height-3">
                  <td>{linkMap.get("7/4")}</td>
                  <td>{linkMap.get("8/4")}</td>
                </tr>
                <tr className="table-height-3">
                  <td>{linkMap.get("13/1")}</td>
                  <td>{linkMap.get("13/2")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Ponds;
