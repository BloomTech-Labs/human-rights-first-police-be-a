exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('force_ranks')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('force_ranks').insert([
        {
          incident_id: 1,
          incident_date: '2021-03-01T00:00:00.000Z',
          tweet_id: '1366291653267513344',
          user_name: 'shafiur',
          description:
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
            'https://vimeo.com/540571411',
            'https://twitter.com/warpspdskeleton/status/1387075760805060609',
          ]),
        },
        {
          incident_id: 2,
          incident_date: '2021-03-01T00:00:00.000Z',
          tweet_id: '1366320977223835648',
          user_name: 'campbellclaret',
          description:
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
            'https://twitter.com/osuala_cheyenne/status/1383915493040422914',
            'https://twitter.com/osuala_cheyenne/status/1384017009139077125',
            'https://twitter.com/osuala_cheyenne/status/1384017218309001220',
            'https://wtop.com/national/2021/04/video-louisville-officer-punches-protester-during-arrest/',
            'https://www.courier-journal.com/story/news/local/2021/04/18/breonna-taylor-video-shows-lmpd-cop-punching-protester-during-arrest/7279751002/',
          ]),
        },
        {
          incident_id: 3,
          incident_date: '2021-03-01T00:00:00.000Z',
          tweet_id: '1366398255588921351',
          user_name: 'walone4',
          description:
            'People attend the funeral of a woman who was shot dead yesterday while police were trying to disperse an anti-coup… https://t.co/FtVCv70s9U',
          city: null,
          state: null,
          lat: null,
          long: null,
          title: null,
          force_rank: 'Rank 5 - Lethal Force',
          status: 'approved',
          confidence: 50,
          tags: JSON.stringify(['shot', 'police', 'disperse']),
          src: JSON.stringify([
            'https://twitter.com/wyattreed13/status/1383646455974428679',
            'https://twitter.com/ChuckModi1/status/1383647378759032832',
          ]),
        },
        {
          incident_id: 4,
          incident_date: '2021-03-01T00:00:00.000Z',
          tweet_id: '1366291653267513344',
          user_name: 'shafiur',
          description:
            '#March1Coup: WATCH as 7 helmeted police beat a civilian with truncheons. Then kick him as he lies on the ground.  S… https://t.co/IJ2cRwRfCL',
          city: 'San Francisco',
          state: 'CA',
          lat: null,
          long: null,
          title: null,
          force_rank: 'Rank 2 - Empty-hand',
          status: 'approved',
          confidence: 20,
          tags: JSON.stringify(['police', 'kick', 'beat']),
          src: JSON.stringify([
            'https://twitter.com/AlexKentTN/status/1383290508181590018',
          ]),
        },
        {
          incident_id: 5,
          incident_date: '2021-03-01T00:00:00.000Z',
          tweet_id: '1366291653267513344',
          user_name: 'shafiur',
          description:
            '#March1Coup: WATCH as 7 helmeted police beat a civilian with truncheons. Then kick him as he lies on the ground.  S… https://t.co/IJ2cRwRfCL',
          city: 'San Francisco',
          state: 'CA',
          lat: null,
          long: null,
          title: null,
          force_rank: 'Rank 2 - Empty-hand',
          status: 'rejected',
          confidence: 20,
          tags: JSON.stringify(['police', 'kick', 'beat']),
          src: JSON.stringify([
            'https://twitter.com/NickAtNews/status/1383248483918893064',
            'https://twitter.com/JaylaWhitfield/status/1383252826680225793',
            'https://twitter.com/NickAtNews/status/1383252959346130945',
          ]),
        },
      ]);
    });
};
