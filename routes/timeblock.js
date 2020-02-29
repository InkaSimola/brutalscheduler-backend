const express = require('express');
const router = express.Router();

/* GET timeblock */
router.get('/:id', function(req, res, next) {
  res.send(`Respond with contents of timeblock ${req.params.id}`);
});

/* PUT timeblock */
/* DEVNOTE: No POST because timeblocks already exist and cover everything */
router.put('/edit/:id', function(req, res, next) {
  // TODO:
  
  // Update timeblock with content specified in body + edit-timestamp
  
  // Fetch existing timeblocks within start-end timerange from db
  
  // Alter existing timeblocks to accommodate newly added timeblock and/or expand to fill empty space
  
  // Update db with added timeblock + changes to surrounding blocks
  
  // Send notification via AWS SNS (cronjob / what is the proper way)
  // https://scotch.io/tutorials/nodejs-cron-jobs-by-examples


  
  res.send(`Respond with (oldschool version:) status code 302 & Response headers Location: / (reload main page) to see updated timeblock ${req.params.id} and possible surrounding timeblocks affected by the update`);
});

module.exports = router;