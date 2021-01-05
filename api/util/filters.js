const { DateTime, Interval } = require('luxon');

const filterDataByState = (data, state) => {
  return data.filter((incident) => incident.state === state);
};

const createRange = (range) => {
  // End date is exclusive, so add one day so the user can include the day they've selected
  const dayAfter = range[1].plus({ day: 1 });
  return Interval.fromDateTimes(range[0], dayAfter);
};

const filterDataByDate = (data, range) => {
  return data.filter((incident) =>
    range.contains(DateTime.fromMillis(incident.date.getTime()))
  );
};

module.exports = {
  filterDataByDate,
  createRange,
  filterDataByState,
};
