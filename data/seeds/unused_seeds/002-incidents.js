exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('incidents')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('incidents').insert([
        {
          id: 1,
          date: '2021-02-28T00:00:00.000Z',
          added_on: '2021-03-01T00:00:00.000Z',
          src: JSON.stringify([
            'https://twitter.com/BGOnTheScene/status/1365956754710749187',
            'https://twitter.com/jwcroxton/status/1365912366567759872',
            'https://twitter.com/PDocumentarians/status/1365967922544340993',
            'https://twitter.com/MasonLakePhoto/status/1365935882973290496',
          ]),
          incident_id: 'or-portland-424',
          city: 'Portland',
          state: 'Oregon',
          lat: 45.53293,
          long: -122.6835,
          title: 'Police assault photographer',
          desc:
            'At an anti-ICE protest in the Portland Pearl District, several police officers on bicycles rode up to a clearly labeled photographer standing in the street at 12th Ave and Pettygrove st. The officers pushed the photographer before one officer punches him.',
          categories: JSON.stringify([
            'journalist',
            'punch',
            'push',
            'shove',
            'strike',
          ]),
          force_rank: 'Rank 1 - Police Presence',
        },
        {
          id: 2,
          date: '2021-02-12T00:00:00.000Z',
          added_on: '2021-02-26T00:00:00.000Z',
          src: JSON.stringify([
            'https://twitter.com/ScooterCasterNY/status/1360422269739298818',
            'https://www.youtube.com/watch?v=vIj5ekZGaTs',
            'https://twitter.com/itsa_talia/status/1360513020061974529',
            'https://twitter.com/itsa_talia/status/1360563949465436164',
            'https://twitter.com/itsa_talia/status/1360573983960281097',
            'https://twitter.com/thizzl_/status/1360460991503486981',
            'https://twitter.com/mrCnobi/status/1360662957416452101',
          ]),
          incident_id: 'ny-newyorkcity-120',
          city: 'New York City',
          state: 'New York',
          lat: 40.7624,
          long: -73.978584,
          title:
            'NYPD officers surround, charge, assault, and arrest protesters and journalists',
          desc:
            'Following a "F\\*ck 12" march in Midtown, police encircled the crowd of protesters at 54th St and 6th Ave and declared an unlawful assembly. The crowd of protesters appeared entirely contained on the sidewalk. Police charged the crowd, shoving them with batons, tackling and arresting them. 11 protesters and 2 journalists were arrested, with most released around 5 AM the morning of February 13th.\n\nOne reporter states police took her press badge and bruised her wrists with flexcuffs.',
          categories: JSON.stringify([
            'arrest',
            'baton',
            'journalist',
            'protester',
            'push',
            'shove',
            'tackle',
          ]),
          force_rank: 'Rank 1 - Police Presence',
        },
        {
          id: 3,
          date: '2021-01-29T00:00:00.000Z',
          added_on: '2021-02-26T00:00:00.000Z',
          src: JSON.stringify([
            'https://twitter.com/ChuckModi1/status/1355703466493161476',
          ]),
          incident_id: 'dc-dc-55',
          city: 'DC',
          state: 'Washington DC',
          lat: 38.91709,
          long: -77.03183,
          title: 'Police shove protesters with bikes',
          desc:
            'Footage shows officers repeatedly striking protesters with bicycles.\n\nThe exact location is uncertain, though around 7:30 PM, the protest was at Belmont Rd and Columbia Rd, before ending around 10:30 PM at 14th St and U St.',
          categories: JSON.stringify([
            'bike',
            'protester',
            'push',
            'shove',
            'strike',
          ]),
          force_rank: 'Rank 2 - Empty-hand',
        },
      ]);
    });
};
