exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('incidents')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('incidents').insert([
        {
          incident_id: 1,
          incident_date: '2021-03-01T00:00:00.000Z',
          tweet_id: '1366291653267513344',
          user_name: 'shafiur',
          desc:
            '#March1Coup: WATCH as 7 helmeted police beat a civilian with truncheons. Then kick him as he lies on the ground.  S… https://t.co/IJ2cRwRfCL',
          city: 'San Francisco',
          state: 'CA',
          lat: null,
          long: null,
          title: null,
          force_rank: 'Rank 2 - Empty-hand',
          status: 'pending',
          confidence: 20,
          tags: JSON.stringify(['police', 'kick', 'beat']),
          src: JSON.stringify([
            'https://twitter.com/BGOnTheScene/status/1365956754710749187',
            'https://twitter.com/jwcroxton/status/1365912366567759872',
            'https://twitter.com/PDocumentarians/status/1365967922544340993',
            'https://twitter.com/MasonLakePhoto/status/1365935882973290496',
          ]),
        },
        {
          incident_id: 2,
          incident_date: '2021-03-01T00:00:00.000Z',
          tweet_id: '1366320977223835648',
          user_name: 'campbellclaret',
          desc:
            "As @pritipatel churns another 'lock 'em up' headline, remember - Tories have shut half of police stations, are refu… https://t.co/qqTF0hTtEd",
          city: null,
          state: null,
          lat: null,
          long: null,
          title: null,
          force_rank: 'Rank 2 - Empty-hand',
          status: 'pending',
          confidence: 30,
          tags: JSON.stringify(['police', 'lock', 'shut']),
          src: JSON.stringify([
            'https://twitter.com/ScooterCasterNY/status/1360422269739298818',
            'https://www.youtube.com/watch?v=vIj5ekZGaTs',
            'https://twitter.com/itsa_talia/status/1360513020061974529',
            'https://twitter.com/itsa_talia/status/1360563949465436164',
            'https://twitter.com/itsa_talia/status/1360573983960281097',
            'https://twitter.com/thizzl_/status/1360460991503486981',
            'https://twitter.com/mrCnobi/status/1360662957416452101',
          ]),
        },
        {
          incident_id: 3,
          incident_date: '2021-03-01T00:00:00.000Z',
          tweet_id: '1366398255588921351',
          user_name: 'walone4',
          desc:
            'People attend the funeral of a woman who was shot dead yesterday while police were trying to disperse an anti-coup… https://t.co/FtVCv70s9U',
          city: null,
          state: null,
          lat: null,
          long: null,
          title: null,
          force_rank: 'Rank 5 - Lethal Force',
          status: 'pending',
          confidence: 50,
          tags: JSON.stringify(['shot', 'police', 'disperse']),
          src: JSON.stringify([
            'https://twitter.com/ChuckModi1/status/1355703466493161476',
          ]),
        },
      ]);
    });
};
