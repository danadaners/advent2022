const fs = require("fs");
const readline = require("readline");

//Returns a sorted array of intervals (array of numbers)
// e.g [[ 2, 4 ], [ 6, 8 ]]
const parseIntervals = (str) => {
  const intervalStr = str.split(",");
  const intervalA = intervalStr[0].split("-"),
    intervalB = intervalStr[1].split("-");

  const intervals = [intervalA.map(Number), intervalB.map(Number)];
  return intervals.sort(function (a, b) {
    if (a[0] == b[0]) {
      return b[1] - a[1];
    }
    return a[0] - b[0];
  });
};

const checkIntervals = (line) => {
  let res = 0;
  const intervals = parseIntervals(line);
  const intervalA = intervals[0],
    intervalB = intervals[1];

  if (intervalA[1] >= intervalB[0]) {
    if (intervalA[1] >= intervalB[1]) {
      res++;
    }
    res++;
  }
  return res;
};

async function main() {
  const fileStream = fs.createReadStream("input.txt");
  const file = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let numContains = 0;
  let numOverlapping = 0;
  for await (const line of file) {
    if (checkIntervals(line) > 0) {
      if (checkIntervals(line) === 2) numContains++;
      numOverlapping++;
    }
  }
  console.log("Number of fully contained intervals: ", numContains);
  console.log("Number of overlapping intervals: ", numOverlapping);
}

main();

// *** TESTS ***

// const testInput = [
//   "2-4,6-8",
//   "2-3,4-5",
//   "5-7,7-9",
//   "2-8,3-7",
//   "6-6,4-6",
//   "2-6,4-8",
// ];

// let desc = "intervals overlap but do not fully contain the other";
// let actual = checkIntervals("5-7,7-9");
// let expected = 1;
// assertEqual(actual, expected, desc);

// desc = "number of all fully contained pairs";
// let numContained = 0;
// for (const input of testInput) {
//   if (checkIntervals(input) === 2) numContained++;
// }
// expected = 2;
// assertEqual(numContained, expected, desc);

// desc = "number of all overlapping pairs";
// let numOverlapping = 0;
// for (const input of testInput) {
//   if (checkIntervals(input)) numOverlapping++;
// }
// expected = 4;
// assertEqual(numOverlapping, expected, desc);

// function assertEqual(a, b, desc) {
//   if (a === b) {
//     console.log(`${desc} ... PASS`);
//   } else {
//     console.log(`${desc} ... FAIL: ${a} != ${b}`);
//   }
// }
