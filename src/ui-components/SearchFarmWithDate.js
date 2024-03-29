const SearchFarmWithDate = (props) => {
  return (
    <div style={{ position: "relative", right: "10px" }}>
      <label htmlFor="month" className="me-3">
        เดือน
      </label>
      <select
        name="month"
        id="month"
        className="form-select form-select-sm"
        style={{ width: "100px" }}
        onChange={props.onChange}
        value={props.month}
      >
        <option value="1">มกราคม</option>
        <option value="2">กุมภาพันธ์</option>
        <option value="3">มีนาคม</option>
        <option value="4">เมษายน</option>
        <option value="5">พฤษภาคม</option>
        <option value="6">มิถุนายน</option>
        <option value="7">กรกฎาคม</option>
        <option value="8">สิงหาคม</option>
        <option value="9">กันยายน</option>
        <option value="10">ตุลาคม</option>
        <option value="11">พฤศจิกายน</option>
        <option value="12">ธันวาคม</option>
      </select>
      <label htmlFor="year" className="ms-4 me-3">
        ปี
      </label>
      <select
        name="year"
        id="year"
        className="form-select form-select-sm"
        style={{ width: "100px" }}
        onChange={props.onChange}
        value={props.year}
      >
        <option value="2016">2559</option>
        <option value="2017">2560</option>
        <option value="2018">2561</option>
        <option value="2019">2562</option>
        <option value="2020">2563</option>
        <option value="2021">2564</option>
        <option value="2022">2565</option>
        <option value="2023">2566</option>
        <option value="2024">2567</option>
        <option value="2025">2568</option>
        <option value="2026">2569</option>
      </select>
      <label htmlFor="farm" className="ms-4 me-3">
        ฟาร์ม
      </label>
      <select
        name="farm"
        id="farm"
        className="form-select form-select-sm"
        style={{ width: "100px" }}
        onChange={props.onChange}
        value={props.farm}
      >
        <option value="ฟาร์ม 1">ฟาร์ม 1</option>
        <option value="ฟาร์ม 2">ฟาร์ม 2</option>
        <option value="ฟาร์ม 4">ฟาร์ม 4</option>
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

export default SearchFarmWithDate;
