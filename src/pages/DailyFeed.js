import { Fragment, useEffect, useState } from "react";
import SearchFarmWithDate from "../ui-components/SearchFarmWithDate";
import TableDailyFeed from "../ui-components/TableDailyFeed";
// import { fullMonthThai } from "../utils/date";
import "./DailyFeed.css";
import { rowDailyFeeds } from "../utils/pond";
import { thaiMonths } from "../utils/date";
import Swal from "sweetalert2";
const DailyFeed = () => {
  const tempDate = new Date();
  const [farm, setFarm] = useState("ฟาร์ม 1");
  const [year, setYear] = useState(tempDate.getFullYear());
  const [month, setMonth] = useState(tempDate.getMonth() + 1);
  const [isShow, setIsShow] = useState(false);
  const [feedByName, setFeedByName] = useState({});
  const [idByPondName, setIdByPondName] = useState(new Map());
  const updateIdByPondName = (k, v) => {
    if (typeof idByPondName === "object") {
      const mapIdByPondName = new Map(Object.entries(idByPondName));
      setIdByPondName(mapIdByPondName.set(k, v));
    } else {
      setIdByPondName(new Map(idByPondName.set(k, v)));
    }
  };
  const [isChanged, setIsChange] = useState(false);
  const [dates, setDate] = useState([]);
  const [pondlist, setPondlist] = useState(rowDailyFeeds.get("ฟาร์ม 1"));
  // Function to update the values dynamically
  const handleChangeFeed = () => (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setFeedByName((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
    setIsChange(true);
  };

  const handleChange = () => (event) => {
    let value = event.target.value;
    let name = event.target.name;
    if (name === "month") {
      setMonth(value);
    } else if (name === "year") {
      setYear(value);
    } else if (name === "farm") {
      setFarm(value);
      setPondlist(rowDailyFeeds.get(value));
    }
  };

  const handleSave = (event) => {
    event.preventDefault();
    const daiyFeeds = [];
    const pondMap = new Map(
      pondlist.map(({ name, pond_id }) => [name, pond_id])
    );
    let i = 0;
    for (const [pondKey, feed] of Object.entries(feedByName)) {
      const [, day, pondName] = pondKey.split("_");
      const pondId = pondMap.get(pondName);
      if (!idByPondName.has(pondKey) || typeof idByPondName === "object") i--; // if object that means map is empty
      if (feed > 0 || idByPondName.has(pondKey)) {
        daiyFeeds.push({
          daily_feed_id: idByPondName.get(pondKey) || i,
          active_pond_id: -1,
          pond_id: pondId,
          feed_type: "เหยื่อสด",
          feed_amount: feed,
          feed_unit: "ลัง",
          farm: farm,
          date_issued: `${year}-${month
            .toString()
            .padStart(2, "0")}-${day.padStart(2, "0")}T00:00:00Z`,
          record_status: "A",
        });
      }
    }
    const requestBody = {
      feed_type: "เหยื่อสด",
      farm: farm,
      daily_feed: daiyFeeds,
    };

    // passed validation, so save changes
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    let requestOptions = {
      body: JSON.stringify(requestBody),
      method: "POST",
      headers: headers,
      // credentials: "include",
    };

    fetch(
      `${process.env.REACT_APP_BACKEND}/api/v1/feed/saveDailyFeeds`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          mapppingId(data.result);
        } else {
          console.log(data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    const mapppingId = (keyReceive) => {
      for (const key in idByPondName) {
        if (idByPondName[key] < 0) {
          const updatedValue = keyReceive[idByPondName[key]];
          if (updatedValue !== undefined) {
            updateIdByPondName(key, updatedValue);
          }
        }
      }
    };

    setIsChange(false);
    Swal.fire("บันทึกสำเร็จ!", "", "success");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const search = () => {
      setFeedByName({});
      setIdByPondName({});

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
            console.log(data.result);
            createFeedForm(data.result);
          } else {
            createFeedForm();
          }
        } catch (err) {
          console.log(err);
        }
      };

      const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
      const createFeedForm = (tempDailyFeed) => {
        console.log(tempDailyFeed);
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
            let name = `${month}${year}_${day}_${pond.name}`;
            if (feed?.pond_id === pond.pond_id && feedDate === day) {
              const feedAmount = feed?.feed_amount || 0;
              const dailyFeedId = feed?.daily_feed_id || -1;
              setFeedByName((prevState) => ({
                ...prevState,
                [name]: Number(feedAmount),
              }));
              updateIdByPondName(name, dailyFeedId);
              indexOfFeed++;
              if (indexOfFeed === lengthOfFeed) feed = undefined;
              else feed = tempDailyFeed[indexOfFeed];
              feedDate = new Date(feed?.date_issued).getDate() || 0;
            } else {
              setFeedByName((prevState) => ({
                ...prevState,
                [name]: undefined,
              }));
            }
          }
        }
        setDate(dates);
      };
      fetchDailyFeed();
      setIsShow(true);
    };

    if (isChanged) {
      Swal.fire({
        title: "คุณแน่ใจหรือไม่?",
        text: "คุณยังไม่ได้บันทึกข้อมูลในบ่อนี้",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ค้นหาเลย!",
      }).then((result) => {
        if (result.isConfirmed) {
          search();
          setIsChange(false);
          Swal.fire("สำเร็จ!", "ค้นหาเรียบร้อย", "success");
        }
      });
    } else {
      search();
    }
  };

  return (
    <div>
      <div className="header">เหยื่อรายวัน</div>
      <hr />
      <div className="text-end select-date mb-2">
        <form onSubmit={handleSubmit}>
          <SearchFarmWithDate
            onChange={handleChange()}
            farm={farm}
            year={year}
            month={month}
          />
        </form>
      </div>
      <form action="#!" id="feed_in_form" onSubmit={handleSave}></form>
      {isShow && (
        <Fragment>
          <div className="table-responsive tbodyDiv">
            <table className="text-center table table-striped" width="100%">
              <thead className="text-dark fw-bold">
                <tr>
                  <th>วัน</th>
                  {pondlist.map((pondName) => (
                    <th key={pondName.name}>{pondName.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <TableDailyFeed
                  dates={dates}
                  feedData={feedByName}
                  month={month}
                  year={year}
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
        </Fragment>
      )}
    </div>
  );
};

export default DailyFeed;
