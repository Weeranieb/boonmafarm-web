import { feedTypeConst } from "../constants/feed_type";

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
        defaultValue="fish"
      >
        {Object.entries(feedTypeConst).map(([name_id, name]) => (
          <option key={name_id} value={name_id}>
            {name}
          </option>
        ))}
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
