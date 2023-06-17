import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const SelectActivity = (props) => {
  const [selectedOption, setSelectedOption] = useState(props.act);
  const history = useHistory();
  const location = useLocation();

  const { farm, pond_id, pond_name, active_pond_id, activity_id, activities } =
    location.state || {};

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    const path = `/fillData/${selectedValue}`;
    const state = {
      farm,
      pond_id,
      pond_name,
      active_pond_id,
      activity_id,
      activities,
    };

    history.push({ pathname: path, state });
  };

  return (
    <div className="edit-header mb-4">
      <select
        value={selectedOption}
        onChange={handleChange}
        className="form-select btn-secondary"
        style={{ width: "110px", fontSize: "17px", fontWeight: "500" }}
      >
        <option value="fill">ลงปลา</option>
        <option value="move">ย้ายปลา</option>
        <option value="sell">ขายปลา</option>
      </select>
    </div>
  );
};

export default SelectActivity;
