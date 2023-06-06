import "./OnePond.css";
const OnePond = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <div className="container">
            <div className="row">
              <div className="col text-center" style={{ fontSize: "35px" }}>
                บ่อ: 3/2
              </div>
              <div className="col-9 text-start status text-muted">active</div>
            </div>
          </div>
          <table className="table table-borderless text-center margin-top">
            <tbody>
              <tr>
                <td>
                  <span className="line-height">จำนวนวัน</span>
                  <br />
                  406 วัน
                </td>
                <td>
                  <span className="line-height">วันที่เริ่มเลี้ยง</span>
                  <br />
                  17 ม.ค. 2563
                </td>
                <td>
                  <span className="line-height">จำนวนเหยื่อสด</span>
                  <br />
                  406 ลัง
                </td>
                <td>
                  <span className="line-height">ต้นทุน</span>
                  <br />
                  245,754 ฿
                </td>
                <td>
                  <span className="line-height">กำไรสุทธิ</span>
                  <br />- 245,754 ฿
                </td>
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
          <div className="text-center farm-header text-dark mb-4">ฟาร์ม 2</div>
          <div
            className="border border-2 rounded rounded-3 p-2 justify-content-between"
            style={{ height: "270px" }}
          >
            <div className="d-flex justify-content-between">
              <div className="box-header">กิจกรรมล่าสุด</div>
              <div className="text-primary watch-all">ดูทั้งหมด</div>
            </div>
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
                  <td>ย้ายปลา 1 ไป 3</td>
                </tr>
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
                <tr>
                  <td>9 ธันวาคม 2565 - 5 สิงหาคม 2566</td>
                </tr>
                <tr>
                  <td>9 ธันวาคม 2565 - 5 สิงหาคม 2566</td>
                </tr>
                <tr>
                  <td>9 ธันวาคม 2565 - 5 สิงหาคม 2566</td>
                </tr>
                <tr>
                  <td>9 ธันวาคม 2565 - 5 สิงหาคม 2566</td>
                </tr>
                <tr>
                  <td>9 ธันวาคม 2565 - 5 สิงหาคม 2566</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnePond;
