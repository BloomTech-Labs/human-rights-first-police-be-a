const legacyIncidents = require('./legacyIncidents');

const formatLegacyIncidents = (incidentsArray) => {
  const getTweetIdAndUsername = (sources) => {
    const twitterLink = sources.find((src) => src.includes('twitter.com'));

    if (!twitterLink) {
      return ['', ''];
    }
    const idIndex = twitterLink.indexOf('status/') + 7;
    const usernameIndex = twitterLink.indexOf('.com/') + 5;
    const username = twitterLink.substring(usernameIndex, idIndex - 8);
    const id = twitterLink.substring(idIndex);
    return [id, username];
  };

  incidentsArray.forEach((incident) => {
    const [id, username] = getTweetIdAndUsername(incident.src);

    incident.tags = incident.categories;
    incident.date_created = incident.date;
    incident.description =
      incident.desc + '\nSources: ' + incident.src.join(' ');
    incident.tweet_id = id;
    incident.user_name = username;
    incident.status = 'approved';
    delete incident.date;
    delete incident.id;
    delete incident.added_on;
    delete incident.incident_id;
    delete incident.src;
  });
};

formatLegacyIncidents;

exports.seed = function (knex) {
  return knex('incidents').insert(legacyIncidents);
};
