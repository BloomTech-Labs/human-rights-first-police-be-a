/**
 * This file runs a command that initially populates the incidents database
 */

 const { dsInitialFetch } = require('../api/dsService/dsUtil');

 dsInitialFetch();