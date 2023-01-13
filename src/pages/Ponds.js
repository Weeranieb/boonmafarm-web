import "./Ponds.css";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const Ponds = () => {
  return (
    <Fragment>
      <div className="pond-header">บ่อปลาทั้งหมด</div>
      <div class="container">
        <div class="row">
          <div class="col-sm text-center">
            <span className="farm-header text-dark">ฟาร์ม 1</span>
            <table className="table margin-pond table-borderless">
              <tbody>
                <tr className="table-height">
                  <td>1 ซ้าย</td>
                  <td>1 กลาง</td>
                  <td>1 ขวา</td>
                </tr>
                <tr className="table-height">
                  <td>2 ซ้าย</td>
                  <td>2 กลาง</td>
                  <td>2 ขวา</td>
                </tr>
                <tr className="table-height">
                  <td>3 ซ้าย</td>
                  <td>3 กลาง</td>
                  <td>3 ขวา</td>
                </tr>
                <tr className="table-height">
                  <td>4 ซ้าย</td>
                  <td>4 กลาง</td>
                  <td>4 ขวา</td>
                </tr>
                <tr className="table-height">
                  <td>5 ซ้าย</td>
                  <td>5 กลาง</td>
                  <td>5 ขวา</td>
                </tr>
                <tr className="table-height">
                  <td>6 ซ้าย</td>
                  <td>พักน้ำ</td>
                  <td>6 ขวา</td>
                </tr>
                <tr className="table-height">
                  <td>ศญ</td>
                  <td>หลังครัว</td>
                  <td>7 ขวา</td>
                </tr>
                <tr className="table-height">
                  <td colSpan="3">
                    <Link
                      to="/pondDetail"
                      className="text-decoration-none text-dark"
                      style={{ fontWeight: "bolder" }}
                    >
                      ศล
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-sm text-center">
            <span className="farm-header text-dark">ฟาร์ม 2</span>
            <table className="table margin-pond table-borderless">
              <tbody>
                <tr className="table-height-2">
                  <td>1/1/2</td>
                  <td>1/2</td>
                </tr>
                <tr className="table-height-2">
                  <td>2/2</td>
                  <td>3/2</td>
                </tr>
                <tr className="table-height-2">
                  <td>4/2</td>
                  <td>5/2</td>
                </tr>
                <tr className="table-height-2">
                  <td>6/2</td>
                  <td>7/2</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-sm text-center">
            <span className="farm-header text-dark">ฟาร์ม 4</span>
            <table className="table margin-pond table-borderless">
              <tbody>
                <tr className="table-height-3">
                  <td>1/4</td>
                  <td>2/4</td>
                </tr>
                <tr className="table-height-3">
                  <td>3/4</td>
                  <td>4/4</td>
                </tr>
                <tr className="table-height-3">
                  <td>5/4</td>
                  <td>6/4</td>
                </tr>
                <tr className="table-height-3">
                  <td>7/4</td>
                  <td>8/4</td>
                </tr>
                <tr className="table-height-3">
                  <td>13/1</td>
                  <td>13/2</td>
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
