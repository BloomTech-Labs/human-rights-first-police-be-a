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

router.get('/incidents/rejected', async (req, res) => {
  try {
    const twitterRejectedAdminFeed = await twitterIncidentHelper.getAllRejectedIncidents();
    res.status(200).json(twitterRejectedAdminFeed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/incidents/approved', async (req, res) => {
  try {
    const twitterApprovedAdminFeed = await twitterIncidentHelper.getAllApprovedIncidents();
    res.status(200).json(twitterApprovedAdminFeed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put('/incidents/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const updatedTwitterIncident = await twitterIncidentHelper.updateTwitterIncident(
      id,
      changes
    );
    res.status(200).json(updatedTwitterIncident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
