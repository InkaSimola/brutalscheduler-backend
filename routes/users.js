const express = require('express');
const router = express.Router();
const db = require('../data/db')

/* GET users listing. */
router.get('/', function(req, res, next) {

  db.any('SELECT * FROM usr')
    .then(function (data) {
      console.log('DATA:', data);
      res.send(data);

    })
    .catch(function (error) {
      console.log('ERROR:', error)
    })
});

module.exports = router;
