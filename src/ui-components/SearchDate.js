import "./General.css";

const SearchDate = () => {
  return (
    <div>
      <label for="month" className="me-3">
        เดือน
      </label>
      <select
        name="month"
        id="month"
        className="form-select form-select-sm"
        style={{ width: "100px" }}
      >
        <option value="JAN" selected="selected">
          มกราคม
        </option>
        <option value="FEB">กุมภาพันธ์</option>
        <option value="MAR">มีนาคม</option>
        <option value="APR">เมษายน</option>
        <option value="MAY">พฤษภาคม</option>
        <option value="JUN">มิถุนายน</option>
        <option value="JUL">กรกฎาคม</option>
        <option value="AUG">สิงหาคม</option>
        <option value="SEP">กันยายน</option>
        <option value="OCT">ตุลาคม</option>
        <option value="NOV">พฤศจิกายน</option>
        <option value="DEC">ธันวาคม</option>
      </select>
      <label for="year" className="ms-4 me-3">
        ปี
      </label>
      <select
        name="year"
        id="year"
        className="form-select form-select-sm"
        style={{ width: "90px" }}
      >
        <option value="2016">2559</option>
        <option value="2017">2560</option>
        <option value="2018">2561</option>
        <option value="2019">2562</option>
        <option value="2020">2563</option>
        <option value="2021">2564</option>
        <option value="2022">2565</option>
        <option value="2023" selected="selected">
          2566
        </option>
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

export default SearchDate;

// in the future use function to run from 1. to 12. and use current date if yes selected="selected" no selected=""
