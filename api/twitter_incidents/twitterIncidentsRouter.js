const express = require('express');
const router = express.Router();
// Model and util imports
const twitterIncidentHelper = require('./twitterIncidentsModel');

router.get('/incidents', async (req, res) => {
  try {
    const twitterAdminFeed = await twitterIncidentHelper.getAllPendingIncidents();
    res.status(200).json(twitterAdminFeed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
