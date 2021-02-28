/**
 * This file runs a command that initially populates the incidents database
 */

const {
  dsInitialFetch,
  dsTwitterInitialFetch,
} = require('../api/dsService/dsUtil');

dsInitialFetch();
dsTwitterInitialFetch();
