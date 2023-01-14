const TableDailyFeed = (props) => {
  let rows = [];
  for (let i = 0; i < 22; i++) {
    rows.push(
      <td>
        <input
          type="text"
          inputmode="numeric"
          style={{ width: "33px" }}
          name={props.input_by_pu}
          id={props.input_by_pu}
          form={props.form_id}
        />
      </td>
    );
  }
  return (
    <tr>
      <td style={{ fontSize: "14px" }}>{props.date}</td>
      {rows}
    </tr>
  );
};

export default TableDailyFeed;

// all of these are dummy
