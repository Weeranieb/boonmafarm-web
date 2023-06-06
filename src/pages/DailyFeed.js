import SearchFarm from "../ui-components/SearchFarmWithDate";
import TableDailyFeed from "../ui-components/TableDailyFeed";
import "./DailyFeed.css";
const DailyFeed = () => {
  return (
    <div>
      <div className="header">เหยื่อรายวัน</div>
      <hr />
      <div className="text-end select-date">
        <form action="#!">
          <SearchFarm />
        </form>
      </div>
      <form action="#!" id="feed_in_form"></form>
      <div className="table-responsive tbodyDiv">
        <table className="text-center table table-striped" width="100%">
          <thead className="text-dark fw-bold">
            <td>วัน</td>
            <td>1ซ้าย</td>
            <td>2ซ้าย</td>
            <td>3ซ้าย</td>
            <td>4ซ้าย</td>
            <td>5ซ้าย</td>
            <td>6ซ้าย</td>
            <td>1กลาง</td>
            <td>2กลาง</td>
            <td>3กลาง</td>
            <td>4กลาง</td>
            <td>5กลาง</td>
            <td>1ขวา</td>
            <td>2ขวา</td>
            <td>3ขวา</td>
            <td>4ขวา</td>
            <td>5ขวา</td>
            <td>6ขวา</td>
            <td>7ขวา</td>
            <td>พักน้ำ</td>
            <td>ศญ</td>
            <td>ศล</td>
            <td>หลังครัว</td>
          </thead>
          <div style={{ height: "5px" }}></div>
          <tbody>
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
            <TableDailyFeed date={"1 ก.พ. 2565"} />
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary ms-3 mt-4" form="feed_in_form">
        บันทึก
      </button>
    </div>
  );
};

export default DailyFeed;
