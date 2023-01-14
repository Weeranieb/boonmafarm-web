const TableFeedIn = (props) => {
  return (
    <tr>
      <td style={{ fontSize: "14px" }}>{props.date}</td>
      <td>
        <input
          type="text"
          inputmode="numeric"
          name={props.input_by_pu}
          id={props.input_by_pu}
          form={props.form_id}
        />
      </td>
      <td>
        <input
          type="text"
          inputmode="numeric"
          name={props.input_by_nong}
          id={props.input_by_nong}
          form={props.form_id}
        />
      </td>
      <td>
        <input
          type="text"
          inputmode="numeric"
          name={props.input_by_sa}
          id={props.input_by_sa}
          form={props.form_id}
        />
      </td>
    </tr>
  );
};

export default TableFeedIn;
