const {
  incidentQuery: incidentQuerySchema,
} = require('../util/validationSchemas');

const validateAndSanitizeIncidentQueries = async (req, _res, next) => {
  if (!req.body) {
    return next();
  }
  try {
    const validQuery = await incidentQuerySchema.validate(req.body, {
      stripUnknown: true,
    });
    req.sanitizedQueries = validQuery;
    delete req.body;
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

module.exports = {
  validateAndSanitizeIncidentQueries,
};
