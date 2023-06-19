function TableRows({ rows, tableRowRemove, onValUpdate }) {
  return rows.map((rowsData, index) => {
    const { no, size, total_amount, price_per_kilo, total, isShow } = rowsData;
    return (
      <tr key={index} style={!isShow ? { display: "none" } : {}}>
        <td className="text-center">{no}</td>
        <td>
          <select
            name="size"
            className="form-select "
            style={{ width: "100px" }}
            onChange={(event) => onValUpdate(index, event)}
            value={size}
          >
            <option value="ปลา 9">ปลา 9</option>
            <option value="ปลา 8">ปลา 8</option>
            <option value="ปลา 7">ปลา 7</option>
            <option value="ปลา 6">ปลา 6</option>
            <option value="ปลา 5">ปลา 5</option>
            <option value="ปลา 4">ปลา 4</option>
            <option value="ปลา 3">ปลา 3</option>
            <option value="ปลา 2">ปลา 2</option>
            <option value="ปลา 1">ปลา 1</option>
            <option value="ปลาเล็ก">ปลาเล็ก</option>
            <option value="ปลาพิการ">ปลาพิการ</option>
            <option value="ปลาเล็ก">ปลาผอม</option>
            <option value="ปลาแผล">ปลาแผล</option>
          </select>
        </td>
        <td>
          <input
            type="text"
            inputMode="numeric"
            value={total_amount}
            onChange={(event) => onValUpdate(index, event)}
            name="total_amount"
            className="form-control"
          />
        </td>
        <td>
          <input
            type="text"
            inputMode="numeric"
            value={price_per_kilo}
            onChange={(event) => onValUpdate(index, event)}
            name="price_per_kilo"
            className="form-control"
          />
        </td>
        <td>
          <input
            type="text"
            value={total}
            onChange={(event) => onValUpdate(index, event)}
            name="total"
            className="form-control"
            disabled
          />
        </td>
        <td>
          <button
            className="btn btn-dark btn-sm"
            onClick={() => tableRowRemove(index)}
          >
            Delete Row
          </button>
        </td>
      </tr>
    );
  });
}

export default TableRows;
