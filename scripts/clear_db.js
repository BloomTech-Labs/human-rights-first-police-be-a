/**
 * This file runs a command that will delete all contents of the incidents database
 */

const Incidents = require('../api/incidents/incidentsModel');

function deleteDatabase() {
    return Incidents.deleteDB();
}

deleteDatabase();