exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('incidents')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('incidents').insert([
        {
          date_created: '2021-03-01T00:00:00.000Z',
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
        },
        {
          date_created: '2021-03-01T00:00:00.000Z',
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
        },
        {
          date_created: '2021-03-01T00:00:00.000Z',
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
        },
      ]);
    });
};
