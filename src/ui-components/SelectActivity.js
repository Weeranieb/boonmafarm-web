import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SelectActivity = (props) => {
  const [selectedOption, setSelectedOption] = useState(props.act);
  const history = useHistory();

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    const path = `/fillData/${selectedValue}`;
    const state = {
      farm: props.farm,
      pond_id: props.pond_id,
      pond_name: props.pond_name,
      active_pond_id: props.active_pond_id,
      activity_id: props.activity_id,
      activities: props.activities,
      is_closed: props.is_closed,
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
        disabled={props.is_closed} // Disable the select element when props.is_closed is true
      >
        <option value="fill" disabled={props.is_closed}>
          ลงปลา
        </option>
        <option value="move" disabled={props.is_closed}>
          ย้ายปลา
        </option>
        <option value="sell" disabled={props.is_closed}>
          ขายปลา
        </option>
      </select>
    </div>
  );
};

export default SelectActivity;
