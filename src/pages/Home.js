import { Fragment } from "react";
import "./Home.css";
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
              <ul class="list-unstyled mt-3 mb-4">
                <li>9 ธันวาคม 2565 16:45น. ย้ายปลา 1 ไป 3</li>
                <li>9 ธันวาคม 2565 16:45น. ย้ายปลา 1 ไป 3</li>
                <li>9 ธันวาคม 2565 16:45น. ย้ายปลา 1 ไป 3</li>
                <li>9 ธันวาคม 2565 16:45น. ย้ายปลา 1 ไป 3</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header py-3">
              <h4 class="my-0 fw-normal">อันดับกำไรมากสุด/ปี</h4>
            </div>
            <div class="card-body">
              <ul class="list-unstyled mt-3 mb-4">
                <li>1. บ่อ 2 กลาง กำไร 589,345 บาท</li>
                <li>2. บ่อ 3 กลาง กำไร 589,345 บาท</li>
                <li>3. บ่อ 1 กลาง กำไร 589,345 บาท</li>
                <li>4. บ่อ 5 กลาง กำไร 589,345 บาท</li>
                <li>5. บ่อ 4 กลาง กำไร 589,345 บาท</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
