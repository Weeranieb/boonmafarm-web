import { Fragment } from "react";
const SearchFarmNoSearch = (props) => {
  const { onChange, property_pond } = props;

  const selectedPondName =
    property_pond && property_pond.pondName ? property_pond.pondName : "";
  console.log("selectedPondName is", selectedPondName);
  return (
    <Fragment>
      <select
        name="farm"
        id="farm"
        className="form-select form-select-sm"
        style={{ width: "100px" }}
        onChange={onChange}
        value={property_pond.farm}
      >
        <option value="ฟาร์ม 1">ฟาร์ม 1</option>
        <option value="ฟาร์ม 2">ฟาร์ม 2</option>
        <option value="ฟาร์ม 4">ฟาร์ม 4</option>
      </select>
      <label htmlFor="pond" className="ms-2 me-2">
        บ่อ
      </label>
      <select
        name="pondName"
        id="pondName"
        className="form-select form-select-sm"
        style={{ width: "100px" }}
        onChange={onChange}
        value={selectedPondName}
      >
        {property_pond.pondList.map((pond) => (
          <option key={pond.pond_id} value={pond.name}>
            {pond.name}
          </option>
        ))}
      </select>
    </Fragment>
  );
};

export default SearchFarmNoSearch;
