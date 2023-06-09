const TableDailyFeed = (props) => {
  const keys = [];
  let rows = [];
  for (const [index, day] of props.dates.entries()) {
    let row = [];
    for (let pond of props.pondList) {
      let key = `${index + 1}_${pond.name}`;
      keys.push(key);
      let data = props.feedData[key];
      row.push(
        <td key={key}>
          <input
            type="number"
            inputMode="numeric"
            style={{ width: "33px" }}
            name={key}
            id={key}
            form={props.form_id}
            className="text-end"
            value={data}
            onChange={props.onChange}
          />
        </td>
      );
    }

    rows.push(
      <tr>
        <td style={{ fontSize: "14px" }}>{day}</td>
        {row}
      </tr>
    );
  }

  return rows;
};

export default TableDailyFeed;

// all of these are dummy
