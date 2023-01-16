const SearchFarm = () => {
  return (
    <div style={{ position: "relative", right: "10px" }}>
      <label for="farm" className="ms-4 me-3">
        ฟาร์ม
      </label>
      <select
        name="farm"
        id="farm"
        className="form-select form-select-sm"
        style={{ width: "100px" }}
      >
        <option value="farm_1" selected="selected">
          ฟาร์ม 1
        </option>
        <option value="farm_2">ฟาร์ม 2</option>
        <option value="farm_4">ฟาร์ม 4</option>
      </select>
      <label for="pond" className="ms-4 me-3">
        บ่อ
      </label>
      <select
        name="pond"
        id="pond"
        className="form-select form-select-sm"
        style={{ width: "100px" }}
      >
        <option value="1/1/2">1/1/2</option>
        <option value="1/2">1/2</option>
        <option value="2/2">2/2</option>
        <option value="3/2">3/2</option>
        <option value="4/2">4/2</option>
        <option value="5/2">5/2</option>
        <option value="6/2">6/2</option>
        <option value="7/2">7/2</option>
      </select>
      <button
        className="ms-4 btn btn-primary btn-sm"
        style={{ fontSize: "13px" }}
      >
        ค้นหา
      </button>
    </div>
  );
};

export default SearchFarm;
