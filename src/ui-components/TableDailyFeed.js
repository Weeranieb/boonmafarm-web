const TableDailyFeed = (props) => {
  console.log("table is creating");
  console.log(props.feedData);
  const keys = [];
  let rows = [];
  for (const [index, day] of props.dates.entries()) {
    let row = [];
    for (let pond of props.pondList) {
      let key = `${props.month}${props.year}_${index + 1}_${pond.name}`;
      keys.push(key);
      let data = props.feedData[key];
      row.push(
        <td key={key}>
          <input
            type="text"
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
      <tr key={index}>
        <td style={{ fontSize: "14px" }}>{day}</td>
        {row}
      </tr>
    );
  }

  return rows;
};

export default TableDailyFeed;

// all of these are dummy
