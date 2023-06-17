export const fullMonthThai = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

export const thaiMonths = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

export const changeTimeUTCToThaiDate = (dateUTC) => {
  const exactDate = dateUTC.slice(0, 10);
  const date = new Date(exactDate);
  const year = date.getFullYear() + 543;
  const month = fullMonthThai[date.getMonth()];
  const day = date.getDate();
  return `${day} ${month} ${year}`;
};
