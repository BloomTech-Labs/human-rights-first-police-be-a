const createError = require('http-errors');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const oktaVerifierConfig = require('../../config/okta');
const oktaJwtVerifier = new OktaJwtVerifier(oktaVerifierConfig.config);

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.
 */
const authRequired = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    oktaJwtVerifier
      .verifyAccessToken(authHeader, oktaVerifierConfig.expectedAudience)
      .then(async () => {
        next();
      })
      .catch(next);
  } catch (err) {
    next(createError(401, err.message));
  }
};

module.exports = authRequired;
