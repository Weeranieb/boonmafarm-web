import { Fragment } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Fragment>
      <div className="greet">ยินดีต้อนรับสู่ บุญมาฟาร์ม</div>
      <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header py-3">
              <h4 class="my-0 fw-normal">เพิ่มข้อมูลครั้งล่าสุด</h4>
            </div>
            <div class="card-body">
              <h4 class="card-title pricing-card-title">
                <small class="text-muted fw-light">
                  9 ธันวาคม 2565 16:45น.
                </small>
              </h4>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header py-3">
              <h4 class="my-0 fw-normal">กิจกรรมล่าสุด</h4>
            </div>
            <div class="card-body text-align-left">
              <table className="table">
                <tbody>
                  <tr>
                    <td>9 ธันวาคม 2565 16:45น.</td>
                    <td>ย้ายปลา 1 ไป 3</td>
                  </tr>
                  <tr>
                    <td>9 ธันวาคม 2565 16:45น.</td>
                    <td>ย้ายปลา 1 ไป 3</td>
                  </tr>
                  <tr>
                    <td>9 ธันวาคม 2565 16:45น.</td>
                    <td>ย้ายปลา 1 ไป 3</td>
                  </tr>
                  <tr>
                    <td>9 ธันวาคม 2565 16:45น.</td>
                    <td>ย้ายปลา 1 ไป 3</td>
                  </tr>
                  <tr>
                    <td>9 ธันวาคม 2565 16:45น.</td>
                    <td>
                      <Link
                        to="/"
                        className="text-decoration-none text-dark"
                        style={{ fontWeight: "bolder" }}
                      >
                        ย้ายปลา 1 ไป 3
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header py-3">
              <h4 class="my-0 fw-normal">อันดับกำไรมากสุด/ปี</h4>
            </div>
            <div class="card-body">
              <table className="table">
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>
                      <Link
                        to="/ponds"
                        className="text-decoration-none text-dark"
                        style={{ fontWeight: "bolder" }}
                      >
                        บ่อ 2 กลาง
                      </Link>
                    </td>
                    <td>กำไร 589,345 บาท</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>บ่อ 3 กลาง</td>
                    <td>กำไร 589,345 บาท</td>
                  </tr>
                  <tr>
                    <td>3.</td>
                    <td>บ่อ 1 กลาง</td>
                    <td>กำไร 589,345 บาท</td>
                  </tr>
                  <tr>
                    <td>4.</td>
                    <td>บ่อ 5 กลาง</td>
                    <td>กำไร 589,345 บาท</td>
                  </tr>
                  <tr>
                    <td>5.</td>
                    <td>บ่อ 4 กลาง</td>
                    <td>กำไร 589,345 บาท</td>
                  </tr>
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
