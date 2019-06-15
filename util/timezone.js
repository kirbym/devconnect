const moment = require('moment');

const setTimezoneOffset = dateString => {
  let dateUTC = null;
  if (moment(dateString, 'YYYY-MM-DD', true).isValid()) {
    dateUTC = new Date(dateString);
    dateUTC.setUTCMinutes(
      dateUTC.getUTCMinutes() + dateUTC.getTimezoneOffset()
    );
  }
  return dateUTC;
};

module.exports = setTimezoneOffset;
