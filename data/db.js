const pgp = require('pg-promise')(/* options */);
const db = pgp(`${process.env['DB_URL']}`);

console.log('TESTBLOCK')
db.any('SELECT * FROM usr')
  .then(function (data) {
    console.log('DATA:', data)
    console.log('TESTBLOCK FINISHED')
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  });

module.exports = db;