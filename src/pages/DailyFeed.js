import { useEffect, useState } from "react";
import SearchFarmWithDate from "../ui-components/SearchFarmWithDate";
import TableDailyFeed from "../ui-components/TableDailyFeed";
// import { fullMonthThai } from "../utils/date";
import "./DailyFeed.css";
import { rowDailyFeeds } from "../utils/pond";
import { thaiMonths } from "../utils/date";
const DailyFeed = () => {
  const tempDate = new Date();
  const [farm, setFarm] = useState("ฟาร์ม 1");
  const [year, setYear] = useState(tempDate.getFullYear());
  const [month, setMonth] = useState(tempDate.getMonth() + 1);
  // const [dailyFeed, setDailyFeed] = useState([]);
  // const [dateInTable, setDateInTable] = useState([]);
  const [feedByName, setFeedByName] = useState({});
  const [idByPondName, setIdByPondName] = useState({});
  const [dates, setDate] = useState([]);
  const [pondlist, setPondlist] = useState(rowDailyFeeds.get("ฟาร์ม 1"));
  // Function to update the values dynamically
  const handleChangeFeed = () => (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setFeedByName((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(feedByName);
  };

  const handleChange = () => (event) => {
    let value = event.target.value;
    let name = event.target.name;
    if (name === "month") {
      setMonth(value);
      setFeedByName({});
      setIdByPondName({});
    } else if (name === "year") {
      setYear(value);
      setFeedByName({});
      setIdByPondName({});
    } else if (name === "farm") {
      setFarm(value);
      setFeedByName({});
      setIdByPondName({});
      setPondlist(rowDailyFeeds.get(value));
    }
    console.log(feedByName);
  };

  const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

  useEffect(() => {
    // actually it is just first time
    const fetchDailyFeed = async () => {
      try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const requestOptions = {
          method: "GET",
          headers: headers,
        };

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/api/v1/feed/getDailyFeeds?feed_type=เหยื่อสด&farm=${farm}&month=${month}&year=${year}`,
          requestOptions
        );
        const data = await response.json();
        if (data.result) {
          // setDailyFeed(data.result);
          createFeedForm(data.result);
        } else {
          createFeedForm();
        }
      } catch (err) {
        console.log(err);
      }
    };

    const createFeedForm = (tempDailyFeed) => {
      let dates = [];
      const days = daysInMonth(year, month);
      const monthThai = thaiMonths[month - 1];
      const yearThai = Number(year) + 543;
      let indexOfFeed = 0;
      const lengthOfFeed = tempDailyFeed ? tempDailyFeed.length : 0;
      let feed = lengthOfFeed > 0 ? tempDailyFeed[indexOfFeed] : undefined;
      let feedDate = new Date(feed?.date_issued).getDate() || 0;
      for (let day = 1; day <= days; day++) {
        dates.push(`${day} ${monthThai} ${yearThai}`);
        for (const pond of pondlist) {
          let name = `${day}_${pond.name}`;
          if (feed?.pond_id === pond.pond_id && feedDate === day) {
            const feedAmount = feed?.feed_amount || 0;
            const activePondId = feed?.active_pond_id || -1;
            setFeedByName((prevState) => ({
              ...prevState,
              [name]: feedAmount,
            }));
            setIdByPondName((prevState) => ({
              ...prevState,
              [name]: activePondId,
            }));
            indexOfFeed++;
            if (indexOfFeed === lengthOfFeed) feed = undefined;
            else feed = tempDailyFeed[indexOfFeed];
            feedDate = new Date(feed?.date_issued).getDate() || 0;
          } else {
            setFeedByName((prevState) => ({
              ...prevState,
              [name]: undefined,
            }));
            // eslint-disable-next-line no-loop-func
            setIdByPondName((prevState) => ({
              ...prevState,
              [name]: -1,
            }));
          }
        }
      }
      setDate(dates);
    };
    fetchDailyFeed();
  }, [farm, year, month, pondlist]);

  return (
    <div>
      <div className="header">เหยื่อรายวัน</div>
      <hr />
      <div className="text-end select-date">
        <form action="#!">
          <SearchFarmWithDate
            onChange={handleChange()}
            farm={farm}
            year={year}
            month={month}
          />
        </form>
      </div>
      <form action="#!" id="feed_in_form"></form>
      <div className="table-responsive tbodyDiv">
        <table className="text-center table table-striped" width="100%">
          <thead className="text-dark fw-bold">
            <td>วัน</td>
            {pondlist.map((pondName) => (
              <td key={pondName.name}>{pondName.name}</td>
            ))}
          </thead>
          <div style={{ height: "5px" }}></div>
          <tbody>
            <TableDailyFeed
              dates={dates}
              feedData={feedByName}
              onChange={handleChangeFeed()}
              pondList={pondlist}
              form_id={"feed_in_form"}
            />
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary ms-3 mt-4" form="feed_in_form">
        บันทึก
      </button>
    </div>
  );
};

export default DailyFeed;
