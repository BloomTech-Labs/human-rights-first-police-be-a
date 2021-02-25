const twitterIncidentHelper = require('../twitter_incidents/twitterIncidentsModel');

const validatePostBody = (req, res, next) => {
  const newTwitterIncident = req.body;
  if (
    'city' in newTwitterIncident &&
    'state' in newTwitterIncident &&
    'lat' in newTwitterIncident &&
    'long' in newTwitterIncident &&
    'title' in newTwitterIncident
  ) {
    req.newIncident = newTwitterIncident;
    next();
  } else {
    res.status(400).json({
      message: 'Missing Fields. Please ensure all fields are completed.',
    });
  }
};

const cleanTwitterPost = async (req, res, next) => {
  try {
    const [lastKnownId] = await twitterIncidentHelper.getLastID();
    const newIncidentID = lastKnownId.max + 1;
    const readyToPost = {
      server_id: newIncidentID,
      ...req.newIncident,
      src: JSON.stringify(req.newIncident.src),
      categories: JSON.stringify(req.newIncident.categories),
    };

    req.TwitterNewIncidentReadyToPost = readyToPost;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  cleanTwitterPost,
  validatePostBody,
};
