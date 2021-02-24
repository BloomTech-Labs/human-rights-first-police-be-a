const validateTwitterPost = (req, res, next) => {
  const newIncident = req.body;
  const readyToPost = {
    ...newIncident,
    src: JSON.stringify(newIncident.src),
    categories: JSON.stringify(newIncident.categories),
  };
  console.log('READY TO POST?', readyToPost);
};

module.exports = {
  validateTwitterPost,
};
