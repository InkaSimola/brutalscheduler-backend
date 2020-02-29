const express = require('express');
const router = express.Router();
const moment = require('moment');
const db = require('../data/db');

function getDateNow() {
  
  let now = moment();
  year = now.year();
  month = now.month();
  date = now.date();

  // Correct for 0-indexing of months
  month += 1;

  return [year, month, date];
}

/* GET home page. */
router.get('/', function (req, res, next) {
  
  // Default view == current date
  let [year, month, date] = getDateNow();
  res.redirect(`week/${year}/${month}/${date}`);
});

module.exports = router;
