import SearchDate from "../ui-components/SearchDate";
import TableFeedIn from "../ui-components/TableFeedIn";
import "./FeedIn.css";
const FeedIn = () => {
  return (
    <div>
      <div className="header">เหยื่อเข้า</div>
      <hr />
      <div className="text-end select-date">
        <SearchDate />
      </div>
      <form action="#!" id="feed_in_form"></form>
      <div class="table-responsive tbodyDiv">
        <table className="text-center table table-striped" width="100%">
          <thead className="text-dark fs-5 fw-bold">
            <td width="10%">วันที่</td>
            <td width="30%">ปุ๊</td>
            <td width="30%">น้อง</td>
            <td width="30%">สา</td>
          </thead>
          <div style={{ height: "5px" }}></div>
          <tbody className="text-dark content">
            <TableFeedIn
              date={"1 ก.พ. 2565"}
              input_by_pu={"day2_pu"}
              input_by_nong={"day2_nong"}
              input_by_sa={"day2_sa"}
              form_id={"feed_in_form"}
            />
            <TableFeedIn
              date={"2 ก.พ. 2565"}
              input_by_pu={"day2_pu"}
              input_by_nong={"day2_nong"}
              input_by_sa={"day2_sa"}
              form_id={"feed_in_form"}
            />
            <TableFeedIn
              date={"2 ก.พ. 2565"}
              input_by_pu={"day2_pu"}
              input_by_nong={"day2_nong"}
              input_by_sa={"day2_sa"}
              form_id={"feed_in_form"}
            />
            <TableFeedIn
              date={"2 ก.พ. 2565"}
              input_by_pu={"day2_pu"}
              input_by_nong={"day2_nong"}
              input_by_sa={"day2_sa"}
              form_id={"feed_in_form"}
            />
            <TableFeedIn
              date={"2 ก.พ. 2565"}
              input_by_pu={"day2_pu"}
              input_by_nong={"day2_nong"}
              input_by_sa={"day2_sa"}
              form_id={"feed_in_form"}
            />
            <TableFeedIn
              date={"2 ก.พ. 2565"}
              input_by_pu={"day2_pu"}
              input_by_nong={"day2_nong"}
              input_by_sa={"day2_sa"}
              form_id={"feed_in_form"}
            />
            <TableFeedIn
              date={"2 ก.พ. 2565"}
              input_by_pu={"day2_pu"}
              input_by_nong={"day2_nong"}
              input_by_sa={"day2_sa"}
              form_id={"feed_in_form"}
            />
            <TableFeedIn
              date={"2 ก.พ. 2565"}
              input_by_pu={"day2_pu"}
              input_by_nong={"day2_nong"}
              input_by_sa={"day2_sa"}
              form_id={"feed_in_form"}
            />
            <TableFeedIn
              date={"2 ก.พ. 2565"}
              input_by_pu={"day2_pu"}
              input_by_nong={"day2_nong"}
              input_by_sa={"day2_sa"}
              form_id={"feed_in_form"}
            />
            <TableFeedIn
              date={"2 ก.พ. 2565"}
              input_by_pu={"day2_pu"}
              input_by_nong={"day2_nong"}
              input_by_sa={"day2_sa"}
              form_id={"feed_in_form"}
            />
            <TableFeedIn
              date={"2 ก.พ. 2565"}
              input_by_pu={"day2_pu"}
              input_by_nong={"day2_nong"}
              input_by_sa={"day2_sa"}
              form_id={"feed_in_form"}
            />
            <TableFeedIn
              date={"2 ก.พ. 2565"}
              input_by_pu={"day2_pu"}
              input_by_nong={"day2_nong"}
              input_by_sa={"day2_sa"}
              form_id={"feed_in_form"}
            />
            <TableFeedIn
              date={"2 ก.พ. 2565"}
              input_by_pu={"day2_pu"}
              input_by_nong={"day2_nong"}
              input_by_sa={"day2_sa"}
              form_id={"feed_in_form"}
            />
            <TableFeedIn
              date={"2 ก.พ. 2565"}
              input_by_pu={"day2_pu"}
              input_by_nong={"day2_nong"}
              input_by_sa={"day2_sa"}
              form_id={"feed_in_form"}
            />
            <TableFeedIn
              date={"2 ก.พ. 2565"}
              input_by_pu={"day2_pu"}
              input_by_nong={"day2_nong"}
              input_by_sa={"day2_sa"}
              form_id={"feed_in_form"}
            />
            <TableFeedIn
              date={"2 ก.พ. 2565"}
              input_by_pu={"day2_pu"}
              input_by_nong={"day2_nong"}
              input_by_sa={"day2_sa"}
              form_id={"feed_in_form"}
            />
            <TableFeedIn
              date={"2 ก.พ. 2565"}
              input_by_pu={"day2_pu"}
              input_by_nong={"day2_nong"}
              input_by_sa={"day2_sa"}
              form_id={"feed_in_form"}
            />
            <TableFeedIn
              date={"2 ก.พ. 2565"}
              input_by_pu={"day2_pu"}
              input_by_nong={"day2_nong"}
              input_by_sa={"day2_sa"}
              form_id={"feed_in_form"}
            />
            <TableFeedIn
              date={"2 ก.พ. 2565"}
              input_by_pu={"day2_pu"}
              input_by_nong={"day2_nong"}
              input_by_sa={"day2_sa"}
              form_id={"feed_in_form"}
            />
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary ms-3 mt-4" form="feed_in_form">
        บันทึก
      </button>
    </div>
  );
};

export default FeedIn;
