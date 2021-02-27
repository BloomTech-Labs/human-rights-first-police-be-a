exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('twitter_incidents')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('twitter_incidents').insert([
        {
          id: 1,
          date: '2021-02-24T22:24:14',
          user_name: 'JournalistJG',
          user_description:
            "Award-winning public interest investigative journalist who exposed Trump's Forbes 400 John Baron con in Washington Post. Author Trump dystopia America 2034.",
          user_location: 'New York, NY',
          coordinates: null,
          geo: null,
          incident_id: '1364702704669388800',
          src: 'http://JonathanGreenberg.com',
          desc:
            '@AnnieGabstonH Hatriots = the GQP hypocrites who shame our country with their support of cop-killing insurrection,… https://t.co/6oqsjU1cY1',
          language: 'en',
          force_rank: 'Rank 5 - Lethal Force',
          pending: true,
          approved: false,
          rejected: false,
        },
        {
          id: 2,
          date: '2021-02-25T05:10:09',
          user_name: 'HtayHtayHan3',
          user_description: '🇲🇲',
          user_location: null,
          coordinates: null,
          geo: null,
          incident_id: '1364804855781494784',
          src: null,
          desc:
            'Only in Myanmar: Junta supporters carried catapults and sticks, set to cause riots in Yangon. The police even remov… https://t.co/tTImTqgWCD',
          language: 'en',
          force_rank: 'Rank 3 - Blunt Force',
          pending: true,
          approved: false,
          rejected: false,
        },
      ]);
    });
};
