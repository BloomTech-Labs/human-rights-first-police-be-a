const twitterIncidentHelper = require('../twitter_incidents/twitterIncidentsModel');

const validatePostBody = (req, res, next) => {
  const newTwitterIncident = req.body;
  if ('desc' in newTwitterIncident && 'date' in newTwitterIncident) {
    req.newIncident = newTwitterIncident;
    next();
  } else {
    res.status(400).json({
      message: 'Missing Fields. Please ensure all fields are completed.',
    });
  }
};
const validateManyPosts = (req, res, next) => {
  const updates = req.body;
  updates.forEach((incident) => {
    console.log(incident);
    if ('desc' in incident && 'date' in incident) {
      next();
    } else {
      res.status(400).json({
        message: 'Missing Fields. Please ensure all fields are completed.',
      });
    }
  });
};

const addIdtoPost = async (req, res, next) => {
  try {
    const [lastKnownId] = await twitterIncidentHelper.getLastID();
    const newIncidentID = lastKnownId.max + 1;
    const readyToPost = {
      id: newIncidentID,
      ...req.newIncident,
    };
    req.TwitterUpdatedReadyToPost = readyToPost;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  validatePostBody,
  addIdtoPost,
  validateManyPosts,
};
