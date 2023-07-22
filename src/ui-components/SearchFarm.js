const SearchFarm = (props) => {
  const { onChange, property_pond, is_closed } = props;

  // TODO add warning sign if it's close it will lose and come again at บ่อ

  const selectedPondName =
    property_pond && property_pond.pondName ? property_pond.pondName : "";
  return (
    <div style={{ position: "relative", right: "10px" }}>
      <label htmlFor="farm" className="ms-4 me-3">
        ฟาร์ม
      </label>
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
      <label htmlFor="pond" className="ms-4 me-3">
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
