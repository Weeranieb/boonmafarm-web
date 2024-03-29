const pondNameMap = new Map([
  ["1 ซ้าย", "บ่อ 1 ซ้าย"],
  ["1 กลาง", "บ่อ 1 กลาง"],
  ["1 ขวา", "บ่อ 1 ขวา"],
  ["2 ซ้าย", "บ่อ 2 ซ้าย"],
  ["2 กลาง", "บ่อ 2 กลาง"],
  ["2 ขวา", "บ่อ 2 ขวา"],
  ["3 ซ้าย", "บ่อ 3 ซ้าย"],
  ["3 กลาง", "บ่อ 3 กลาง"],
  ["3 ขวา", "บ่อ 3 ขวา"],
  ["4 ซ้าย", "บ่อ 4 ซ้าย"],
  ["4 กลาง", "บ่อ 4 กลาง"],
  ["4 ขวา", "บ่อ 4 ขวา"],
  ["5 ซ้าย", "บ่อ 5 ซ้าย"],
  ["5 กลาง", "บ่อ 5 กลาง"],
  ["5 ขวา", "บ่อ 5 ขวา"],
  ["6 ซ้าย", "บ่อ 6 ซ้าย"],
  ["พักน้ำ", "บ่อพักน้ำ"],
  ["6 ขวา", "บ่อ 6 ขวา"],
  ["ศญ", "บ่อศักใหญ่"],
  ["หลังครัว", "บ่อหลังครัว"],
  ["7 ขวา", "บ่อ 7 ขวา"],
  ["สนาม", "บ่อสนาม"],
  ["ศล", "บ่อศักเล็ก"],
  ["1/1/2", "บ่อ 1/1/2"],
  ["1/2", "บ่อ 1/2"],
  ["2/2", "บ่อ 2/2"],
  ["3/2", "บ่อ 3/2"],
  ["4/2", "บ่อ 4/2"],
  ["5/2", "บ่อ 5/2"],
  ["6/2", "บ่อ 6/2"],
  ["7/2", "บ่อ 7/2"],
  ["1/4", "บ่อ 1/4"],
  ["2/4", "บ่อ 2/4"],
  ["3/4", "บ่อ 3/4"],
  ["4/4", "บ่อ 4/4"],
  ["5/4", "บ่อ 5/4"],
  ["6/4", "บ่อ 6/4"],
  ["7/4", "บ่อ 7/4"],
  ["8/4", "บ่อ 8/4"],
  ["13/1", "บ่อ 13/1"],
  ["13/2", "บ่อ 13/2"],
]);

export const swappedPondNameMap = new Map();
for (const [key, value] of pondNameMap) {
  swappedPondNameMap.set(value, key);
}

export const rowDailyFeeds = new Map([
  [
    "ฟาร์ม 1",
    [
      { name: "1ซ้าย", pond_id: 1 },
      { name: "2ซ้าย", pond_id: 2 },
      { name: "3ซ้าย", pond_id: 3 },
      { name: "4ซ้าย", pond_id: 4 },
      { name: "5ซ้าย", pond_id: 5 },
      { name: "6ซ้าย", pond_id: 6 },
      { name: "1กลาง", pond_id: 7 },
      { name: "2กลาง", pond_id: 8 },
      { name: "3กลาง", pond_id: 9 },
      { name: "4กลาง", pond_id: 10 },
      { name: "5กลาง", pond_id: 11 },
      { name: "1ขวา", pond_id: 12 },
      { name: "2ขวา", pond_id: 13 },
      { name: "3ขวา", pond_id: 14 },
      { name: "4ขวา", pond_id: 15 },
      { name: "5ขวา", pond_id: 16 },
      { name: "6ขวา", pond_id: 17 },
      { name: "7ขวา", pond_id: 42 },
      { name: "พักน้ำ", pond_id: 20 },
      { name: "ศญ", pond_id: 18 },
      { name: "ศล", pond_id: 19 },
      { name: "หลังครัว", pond_id: 21 },
      { name: "สนาม", pond_id: 22 },
    ],
  ],
  [
    "ฟาร์ม 2",
    [
      { name: "1/1/2", pond_id: 23 },
      { name: "1/2", pond_id: 24 },
      { name: "2/2", pond_id: 25 },
      { name: "3/2", pond_id: 26 },
      { name: "4/2", pond_id: 27 },
      { name: "5/2", pond_id: 28 },
      { name: "6/2", pond_id: 29 },
      { name: "7/2", pond_id: 30 },
    ],
  ],
  [
    "ฟาร์ม 4",
    [
      { name: "1/4", pond_id: 32 },
      { name: "2/4", pond_id: 33 },
      { name: "3/4", pond_id: 34 },
      { name: "4/4", pond_id: 35 },
      { name: "5/4", pond_id: 36 },
      { name: "6/4", pond_id: 37 },
      { name: "7/4", pond_id: 38 },
      { name: "8/4", pond_id: 39 },
      { name: "13/1", pond_id: 40 },
      { name: "13/2", pond_id: 41 },
    ],
  ],
]);

// map[pond_id]pond_name
export const pondNameMapId = new Map();

rowDailyFeeds.forEach((feeds) => {
  feeds.forEach(({ name, pond_id }) => {
    pondNameMapId.set(name, pond_id);
  });
});
