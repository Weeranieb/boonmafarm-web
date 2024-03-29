import { Fragment, useState, useEffect } from "react";
import { feedTypeConst, unitMap } from "../constants/feed_type";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./FeedPrice.css";
import "./General.css";
import { fetchData } from "../utils/fetch";

const FeedPrice = () => {
  const location = useLocation();
  const history = useHistory();
  const { feed_price_data, feed_price_histories } = location.state || {};
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
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

  useEffect(() => {
    if (shouldRefresh) {
      window.location.reload();
    }

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
  }, [shouldRefresh]);

  const handleChangePrice = (event) => {
    setIsTyping(true);
    const { name, value } = event.target;
    setFeedPriceData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchFeedPriceById = async (feedPriceId, callback) => {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      const response = await fetchData(
        `${process.env.REACT_APP_BACKEND}/api/v1/feed/getFeedPrice?feed_price_id=${feedPriceId}`,
        requestOptions
      );

      if (!response.error) {
        const result = response;
        result.date_issued = result.date_issued.substring(0, 10);
        callback(result);
      }
    } catch (error) {
      console.error("Error fetching feed price:", error);
    }
  };

  const handleSave = (event) => {
    event.preventDefault();
    setIsTyping(false);
    const requestBody = {
      feed_type: feedPriceData.feed_type,
      feed_price: [
        {
          feed_price_id: feedPriceData.feed_price_id || -1,
          feed_type: feedPriceData.feed_type || "",
          price_per_unit: Number(feedPriceData.price_per_unit) || 0,
          feed_unit: feedPriceData.feed_unit || "",
          date_issued: `${feedPriceData.date_issued}T00:00:00Z`,
          record_status: "A",
        },
      ],
    };

    // request POST
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    let requestOptions = {
      body: JSON.stringify(requestBody),
      method: "POST",
      headers: headers,
    };

    // fetch
    fetch(
      `${process.env.REACT_APP_BACKEND}/api/v1/feed/saveFeedPrices`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          refreshStateAfterSave(data.result);
        } else {
          console.log(data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    const feedPriceId = feedPriceData.feed_price_id || -1;
    const refreshStateAfterSave = (feedPrice) => {
      setShouldRefresh(true);
      history.push({
        pathname: "/fillData/feed-price",
        state: {
          feed_price_data: {
            feed_type: feedPriceData.feed_type,
            date_issued: feedPriceData.date_issued,
            price_per_unit: feedPriceData.price_per_unit,
            feed_unit: feedPriceData.feed_unit,
            feed_price_id: feedPrice[feedPriceId],
          },
        },
      });
    };
  };

  useEffect(() => {
    if (!isTyping && feedPriceData !== null) {
      history.push({
        pathname: "/fillData/feed-price",
        state: {
          feed_price_data: feedPriceData,
        },
      });
    }
  }, [feedPriceData, history, isTyping]);

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
            <button className="btn btn-primary btn-sm">บันทึก</button>
            <Link
              to={{
                pathname: `/fillData/feed-price`,
                state: {
                  feed_price_data: feed_price_data,
                },
              }}
              className="btn btn-warning ms-1 btn-sm"
              onClick={() => setShouldRefresh(true)}
            >
              ยกเลิก
            </Link>
            <Link
              to="/fillData/feed-price"
              className="btn btn-danger ms-1 btn-sm ps-3 pe-3"
            >
              ลบ
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
                            fetchFeedPriceById(
                              temp.feed_price_id,
                              setFeedPriceData
                            );
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
