import "./General.css";
const SearchFeedType = () => {
  return (
    <div style={{ fontSize: "15px" }}>
      <label htmlFor="feed_type" className="me-3">
        ประเภทเหยื่อ
      </label>
      <select
        name="feed_type"
        id="feed_type"
        className="form-select form-select-sm"
        style={{ width: "100px" }}
      >
        <option value="fish" selected="selected">
          เหยื่อสด
        </option>
        <option value="pro_feed">โปรฟีด</option>
      </select>
      <label htmlFor="vendor" className="ms-4 me-3">
        คนขายเหยื่อ
      </label>
      <select
        name="vendor"
        id="vendor"
        className="form-select form-select-sm"
        style={{ width: "70px" }}
      >
        <option value="sa" selected="selected">
          สา
        </option>
        <option value="pu">ปุ๊</option>
        <option value="nong">น้อง</option>
      </select>
      <button
        className="ms-4 btn btn-primary btn-sm"
        style={{ fontSize: "12px" }}
      >
        ค้นหา
      </button>
    </div>
  );
};

export default SearchFeedType;
