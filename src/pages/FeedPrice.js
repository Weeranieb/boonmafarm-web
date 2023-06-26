import { Fragment, useState, useEffect } from "react";
import { feedTypeConst, unitMap } from "../constants/feed_type";
import { Link, useLocation, useHistory } from "react-router-dom";
import SearchFeedType from "../ui-components/SearchFeedType";
import "./FeedPrice.css";
import "./General.css";
import { fetchData } from "../utils/fetch";

const FeedPrice = () => {
  // state by location
  const history = useHistory();
  const location = useLocation();
  const { feed_price_data, feed_price_histories } = location.state || {};

  const [feedPriceHistories, setFeedPriceHistories] = useState(
    feed_price_histories || []
  );
  const [feedPriceData, setFeedPriceData] = useState(
    feed_price_data || {
      feed_type: "fish",
      date_issued: "",
      price_per_unit: "",
      feed_unit: "baht per box",
    }
  );
  // const [feedType, setFeedType] = useState(feed_type || "fish");

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetchData(
      `${process.env.REACT_APP_BACKEND}/api/v1/feed/getFeedPriceLists`,
      requestOptions
    ).then((result) => {
      if (!result.error) {
        setFeedPriceHistories(result);
      }
    });
  }, [setFeedPriceHistories]);

  // const handleChangeFeedType = (event) => {
  //   let { value } = event.target;
  //   setFeedType(value);
  //   console.log(feedType);
  // };

  const handleChangePrice = (event) => {
    let { name, value } = event.target;
    console.log(name, value);
    setFeedPriceData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchFeedPriceById = (feedPriceId) => {
    console.log("feed id", feedPriceId);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetchData(
      `${process.env.REACT_APP_BACKEND}/api/v1/feed/getFeedPrice?feed_price_id=${feedPriceId}`,
      requestOptions
    ).then((result) => {
      if (!result.error) {
        result.date_issued = result.date_issued.substring(0, 10);
        console.log("result", result);
        setFeedPriceData(result);
      }
    });
  };

  const handleSave = (event) => {
    event.preventDefault();
    console.log("this is data", feedPriceData);
  };

  return (
    <div>
      <div className="header">ราคาเหยื่อ</div>
      <hr />

      <div className="row">
        <div className="col-6">
          {/* <div className="text-start select-date ms-4 mb-4">
            <form onChange={handleChangeFeedType} feed_type={feedType}>
              <SearchFeedType />
            </form>
          </div> */}
          <div className="edit-header mb-4">เพิ่ม/แก้ไขราคาเหยื่อ</div>
          <form onSubmit={handleSave}>
            <div className="input">
              <table
                className="text-center table table-borderless"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td className="text-end pe-4" style={{ width: "30%" }}>
                      ประเภทเหยื่อ:
                    </td>
                    <td className="text-start">
                      <select
                        name="feed_type"
                        id="feed_type"
                        // aria-label="Disabled select example"
                        // disabled
                        className="form-select form-select-sm"
                        style={{ width: "95px" }}
                        value={feedPriceData.feed_type || "fish"}
                        onChange={handleChangePrice}
                      >
                        {Object.entries(feedTypeConst).map(
                          ([name_id, name]) => (
                            <option key={name_id} value={name_id}>
                              {name}
                            </option>
                          )
                        )}
                      </select>
                    </td>
                  </tr>
                  {/* <tr>
                  <td className="text-end pe-4" style={{ width: "30%" }}>
                    คนขายเหยื่อ:
                  </td>
                  <td className="text-start">
                    <select
                      name="vendor"
                      id="vendor"
                      form="feed_price"
                      aria-label="Disabled select example"
                      disabled
                      className="form-select form-select-sm"
                      style={{ width: "80px" }}
                      defaultValue="sa"
                    >
                      <option value="sa">สา</option>
                      <option value="nong">น้อง</option>x
                      <option value="pu">ปุ๊</option>
                    </select>
                  </td>
                </tr> */}
                  <tr>
                    <td className="text-end pe-4">
                      <label htmlFor="date">วันที่ขึ้นราคา:</label>
                    </td>
                    <td className="text-start">
                      <input
                        type="date"
                        name="date_issued"
                        id="date_issued"
                        className="form-control form-control-sm"
                        style={{ width: "185px" }}
                        value={feedPriceData.date_issued || ""}
                        onChange={handleChangePrice}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-end pe-4">
                      <label htmlFor="price">ราคา:</label>
                    </td>
                    <td className="text-start">
                      <input
                        type="text"
                        name="price_per_unit"
                        inputMode="numeric"
                        id="price_per_unit"
                        className="form-control form-control-sm"
                        style={{ width: "185px" }}
                        onChange={handleChangePrice}
                        value={feedPriceData.price_per_unit || ""}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-end pe-4" style={{ width: "30%" }}>
                      หน่วย:
                    </td>
                    <td className="text-start">
                      <select
                        name="feed_unit"
                        id="feed_unit"
                        className="form-select form-select-sm"
                        style={{ width: "120px" }}
                        value={feedPriceData.feed_unit || "baht per box"}
                        onChange={handleChangePrice}
                      >
                        {[...unitMap.entries()].map(([name_id, name]) => (
                          <option key={name_id} value={name_id}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ height: "40px" }}></div>
            <button className="btn btn-primary btn-sm">Save</button>
            <Link
              to="/fillData/feed-price"
              className="btn btn-warning ms-1 btn-sm"
            >
              Cancel
            </Link>
            <Link
              to="/fillData/feed-price"
              className="btn btn-danger ms-1 btn-sm"
            >
              Delete
            </Link>
          </form>
        </div>

        <div className="col">
          <div className="border border-2 rounded rounded-3 p-2 justify-content-between">
            <div className="d-flex justify-content-between p-3">
              <div className="box-header">ประวัติราคา</div>
              <div className="text-primary watch-all">ดูทั้งหมด</div>
            </div>
            <table className="table">
              <thead className="text-center" style={{ fontSize: "17px" }}>
                <tr>
                  <th style={{ width: "46%" }}>วันที่</th>
                  <th style={{ width: "18%" }}>ราคา</th>
                  <th style={{ width: "18%" }}>หน่วย</th>
                  <th style={{ width: "18%" }}></th>
                </tr>
              </thead>
              <tbody>
                {feedPriceHistories.slice(0, 5).map((temp, index) => (
                  <Fragment key={index}>
                    <tr>
                      <td className="text-left ps-3">{temp.date}</td>
                      <td className="text-center">{temp.price_per_unit}</td>
                      <td className="text-center">
                        {unitMap.get(temp.feed_unit)}
                      </td>
                      <td className=" text-center">
                        <Link
                          to={{
                            pathname: `/fillData/feed-price`,
                            state: {
                              feed_price_data: feedPriceData,
                            },
                          }}
                          className="link-dark"
                          onClick={() => {
                            fetchFeedPriceById(temp.feed_price_id);
                          }}
                        >
                          แก้ไข
                        </Link>
                      </td>
                    </tr>
                  </Fragment>
                ))}
                {feedPriceHistories.length === 0 && (
                  <tr style={{ height: "40px" }}></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPrice;
