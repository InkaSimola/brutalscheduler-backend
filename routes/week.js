const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const db = require('../data/db');


// TODO: Get from config
let viewStartHour = 7;
let viewEndHour = 23;
let nbDaysShown = 7;

// TODO: Get from config
monthNames = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
};

// TODO: Get from config
weekdayNames = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

// TODO: Get user-specific (later)
let weekdayImgs = {
  "MA": "./weekday-img-placeholder.jpg",
  "TI": "./weekday-img-placeholder.jpg",
  "KE": "./weekday-img-placeholder.jpg",
  "TO": "./weekday-img-placeholder.jpg",
  "PE": "./weekday-img-placeholder.jpg",
  "LA": "./weekday-img-placeholder.jpg",
  "SU": "./weekday-img-placeholder.jpg"
};

// TODO: Replace mock values
function getWeekdayNameSequence(firstDayName) {
  return [ "MA", "TI", "KE", "TO", "PE", "LA", "SU"];
}

// TODO: Replace mock values
function getDateSequence(year, month, date) {
  return {
    "dates": [17, 18, 19, 20, 21, 22, 23],
    "months": [2, 2, 2, 2, 2, 2, 2]
  };
}

function getWeekdayImgSequence(weekdayImgs, weekdayNameSeq) {
  return [
    weekdayImgs[weekdayNameSeq[0]],
    weekdayImgs[weekdayNameSeq[1]],
    weekdayImgs[weekdayNameSeq[2]],
    weekdayImgs[weekdayNameSeq[3]],
    weekdayImgs[weekdayNameSeq[4]],
    weekdayImgs[weekdayNameSeq[5]],
    weekdayImgs[weekdayNameSeq[6]],
  ];
}

/* GET data for given date and following 6 days */
router.get('/:year/:month/:date', async (req, res) => {

  /* 
  Construct weekData object
  */

  year = req.params.year;
  month = req.params.month;  // Not 0-indexed, observe
  date = req.params.date;

  let firstDayShown = moment({ year: year, month: month - 1, day: date });
  let lastDayShown = moment({ year: year, month: month - 1, day: date }).add(nbDaysShown, 'days');
  let ts_start = firstDayShown.tz("Europe/Finland").format();
  let ts_end = lastDayShown.tz("Europe/Finland").format();

  console.log('--------------------------------------------------------------------');
  console.log('Default view:', ts_start, '-', ts_end);
  console.log('--------------------------------------------------------------------');

  const tblocks = await db.any('SELECT * FROM timeblock WHERE ts_start>=${ts_start} and ts_end<=${ts_end}',
  {
    ts_start: ts_start,
    ts_end: ts_end
  });
  // console.log('Timeblocks fetched from db ', tblocks);

  let weekNumber = firstDayShown.week();  // Only applies to starting date. TODO: allow for two weeks
  let monthName = monthNames[month];  // Only applies to starting date. TODO: allow for two months

  let weekData = {
    "year": year,
    "monthName": monthName,
    "weekNumber": weekNumber
  };

  /*
  Construct dayHeadersData
  */

  let weekday = firstDayShown.weekday();  // Weekday number
  let weekdayName = weekdayNames[weekday];

  /* TODO: Get daynumbers, weekdayNames, weekdayImgs and monthNumbers for the next 6 days
  and replace mock with real data */

  let weekdayNameSeq = getWeekdayNameSequence(weekdayName); 
  let dateSeq = getDateSequence(year, month, date);
  let weekdayImgSeq = getWeekdayImgSequence(weekdayImgs, weekdayNameSeq);

  let dayHeadersData = {
    "day1": {
      "dayNumber": dateSeq.dates[0],
      "monthNumber": dateSeq.months[0],
      "weekdayName": weekdayNameSeq[0],
      "weekdayImg": weekdayImgSeq[0]
    },
    "day2": {
      "dayNumber": dateSeq.dates[1],
      "monthNumber": dateSeq.months[1],
      "weekdayName": weekdayNameSeq[1],
      "weekdayImg": weekdayImgSeq[1]
    },
    "day3": {
      "dayNumber": dateSeq.dates[2],
      "monthNumber": dateSeq.months[2],
      "weekdayName": weekdayNameSeq[2],
      "weekdayImg": weekdayImgSeq[2]
    },
    "day4": {
      "dayNumber": dateSeq.dates[3],
      "monthNumber": dateSeq.months[3],
      "weekdayName": weekdayNameSeq[3],
      "weekdayImg": weekdayImgSeq[3]
    },
    "day5": {
      "dayNumber": dateSeq.dates[4],
      "monthNumber": dateSeq.months[4],
      "weekdayName": weekdayNameSeq[4],
      "weekdayImg": weekdayImgSeq[4]
    },
    "day6": {
      "dayNumber": dateSeq.dates[5],
      "monthNumber": dateSeq.months[5],
      "weekdayName": weekdayNameSeq[5],
      "weekdayImg": weekdayImgSeq[5]
    },
    "day7": {
      "dayNumber": dateSeq.dates[6],
      "monthNumber": dateSeq.months[6],
      "weekdayName": weekdayNameSeq[6],
      "weekdayImg": weekdayImgSeq[6]
    }
  };

  /*
  TODO: Construct daysContainerData
  */
  // let daysContainerData = (tblocks) => {
  //   // TODO: Parse to form
  //   return parsed;
  // };

  // Mock
  let daysContainerData = {
    1: [
      {
        "id": 1,
        "who": "user2",
        "color": "yellowgreen",
        "start": `${viewStartHour}:00`,
        "end": "10:00",
        "where": "location_1",
        "description": "description",
        "img": null
      },
      {
        "id": 2,
        "who": "user1",
        "color": "deepskyblue",
        "start": "10:00",
        "end": "18:00",
        "where": "location_2",
        "description": "description",
        "img": null
      },
      {
        "id": 3,
        "who": "user2",
        "color": "yellowgreen",
        "start": "18:00",
        "end": `${viewEndHour}:00`,
        "where": "location_1",
        "description": "description",
        "img": null
      }
    ],
    2: [
      {
        "id": 4,
        "who": null,
        "color": "orange",
        "start": `${viewStartHour}:00`,
        "end": `${viewEndHour}:00`,
        "where": null,
        "description": null,
        "img": "./default-day-img.jpg"
      }
    ],
    3: [
      {
        "id": 5,
        "who": null,
        "color": "orange",
        "start": `${viewStartHour}:00`,
        "end": `${viewEndHour}:00`,
        "where": null,
        "description": null,
        "img": "./default-day-img.jpg"
      }
    ],
    4: [
      {
        "id": 6,
        "who": null,
        "color": "orange",
        "start": `${viewStartHour}:00`,
        "end": `${viewEndHour}:00`,
        "where": null,
        "description": null,
        "img": "./default-day-img.jpg"
      }
    ],
    5: [
      {
        "id": 7,
        "who": null,
        "color": "orange",
        "start": `${viewStartHour}:00`,
        "end": `${viewEndHour}:00`,
        "where": null,
        "description": null,
        "img": "./default-day-img.jpg"
      }
    ],
    6: [
      {
        "id": 8,
        "who": null,
        "color": "orange",
        "start": `${viewStartHour}:00`,
        "end": `${viewEndHour}:00`,
        "where": null,
        "description": null,
        "img": "./default-day-img.jpg"
      }
    ],
    7: [
      {
        "id": 9,
        "who": null,
        "color": "orange",
        "start": `${viewStartHour}:00`,
        "end": `${viewEndHour}:00`,
        "where": null,
        "description": null,
        "img": "./default-day-img.jpg"
      }
    ]
  };

  let mockResponse = {
    "weekData": weekData,
    "dayHeadersData": dayHeadersData,
    "daysContainerData": daysContainerData
  }

  res.send(mockResponse);
});

module.exports = router;