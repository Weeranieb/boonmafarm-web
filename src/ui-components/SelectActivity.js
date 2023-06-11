import { useState } from "react";
import { useHistory } from "react-router-dom";

const SelectActivity = (props) => {
  const [selectedOption, setSelectedOption] = useState(props.act);
  const history = useHistory();

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Perform actions based on the selected option
    switch (selectedValue) {
      case "fill":
        history.push("/fillData/fill");
        break;
      case "move":
        history.push("/fillData/move");
        break;
      case "sell":
        history.push("/fillData/sell");
        break;
      default:
        break;
    }
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
