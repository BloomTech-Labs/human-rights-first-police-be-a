const validateTwitterPost = (req, res, next) => {
  const newIncident = req.body;
  const readyToPost = {
    ...newIncident,
    src: JSON.stringify(newIncident.src),
    categories: JSON.stringify(newIncident.categories),
    twitter_incident_id: 'someID',
  };

  req.Twitter = readyToPost;
  next();
};
module.exports = {
  validateTwitterPost,
};
