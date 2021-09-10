const createError = require('http-errors');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const oktaVerifierConfig = require('../../config/okta');
const oktaJwtVerifier = new OktaJwtVerifier(oktaVerifierConfig.config);

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.
 */
const authRequired = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
  if (!match) {
    throw new Error('No idToken');
  }
  const idToken = match[1];
  // eslint-disable-next-line prettier/prettier
  oktaJwtVerifier
    .verifyAccessToken(idToken, oktaVerifierConfig.expectedAudience)
    .then(() => {
      next();
    })
    .catch((err) => {
      next(createError(401, err.message));
    });
};

module.exports = authRequired;
