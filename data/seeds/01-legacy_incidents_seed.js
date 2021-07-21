const legacyIncidents = require('./legacyData/legacyIncidents');

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

  const formattedIncidents = incidentsArray.map((incident) => {
    const [id, username] = getTweetIdAndUsername(incident.src);

    incident.tags = incident.categories;
    incident.incident_date = incident.date;
    incident.description =
      incident.desc + '\nSources: ' + incident.src.join(' ');
    incident.tweet_id = id;
    incident.user_name = username;
    incident.status = 'approved';
    incident.src = [incident.src];
    delete incident.id;
    delete incident.date;
    delete incident.desc;
    delete incident.added_on;
    delete incident.categories;
    delete incident.incident_id;

    return incident;
  });

  return formattedIncidents;
};

exports.seed = function (knex) {
  return knex('incidents').insert(formatLegacyIncidents(legacyIncidents));
};
