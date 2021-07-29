const {
  incidentQuery: incidentQuerySchema,
  incidentObject,
} = require('../../config/validationSchemas');

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

const validateAndSanitizeIncidentObject = async (req, _res, next) => {
  if (!req.body) {
    return next({ status: 400, message: 'incident object required' });
  }

  try {
    const validIncident = await incidentObject.validate(req.body, {
      stripUnknown: true,
    });

    req.sanitizedIncident = validIncident;
    delete req.body;
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

module.exports = {
  validateAndSanitizeIncidentObject,
  validateAndSanitizeIncidentQueries,
};
