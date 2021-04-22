exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('twitter_incidents')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('twitter_incidents').insert([
        {
          id: 1,
          date: '2021-03-01T00:00:00.000Z',
          user_name: 'shafiur',
          user_description:
            'Journalist & Documentary Maker. Refugees, Trafficking, NHS. RTs ≠ endorsement/Views mine. Sec., NUJ, Cambridge |  E: shafiur@gmail.com',
          user_location: 'Bangladesh & UK',
          coordinates: null,
          geo: null,
          incident_id: '1366291653267513344',
          src: 'https://t.co/XGKevofsLv',
          city: "San Francisco",
          state: "CA",
          lat: null,
          long: null,
          title: null,
          desc:
            '#March1Coup: WATCH as 7 helmeted police beat a civilian with truncheons. Then kick him as he lies on the ground.  S… https://t.co/IJ2cRwRfCL',
          language: 'en',
          force_rank: 'Rank 2 - Empty-hand',
          accuracy_estimate: 20,
          pending: true,
          approved: false,
          rejected: false,
        },
        {
          id: 2,
          date: '2021-03-01T00:00:00.000Z',
          user_name: 'campbellclaret',
          user_description:
            'Writer, communicator, consultant, strategist, mental health campaigner. Does podcast with daughter Grace. latest book LIVING BETTER, next one Vol 8 diaries',
          user_location: 'London',
          coordinates: null,
          geo: null,
          incident_id: '1366320977223835648',
          src: 'https://t.co/AFMOkBUYVE',
          city: null,
          state: null,
          lat: null,
          long: null,
          title: null,
          desc:
            "As @pritipatel churns another 'lock 'em up' headline, remember - Tories have shut half of police stations, are refu… https://t.co/qqTF0hTtEd",
          language: 'en',
          force_rank: 'Rank 2 - Empty-hand',
          accuracy_estimate: 30,
          pending: true,
          approved: false,
          rejected: false,
        },
        {
          id: 3,
          date: '2021-03-01T00:00:00.000Z',
          user_name: 'walone4',
          user_description:
            "Pulitzer Prize-winning journalist at Reuters. Jay Jay Children's books author, Street photographer",
          user_location: 'Toronto, Ontario',
          coordinates: null,
          geo: null,
          incident_id: '1366398255588921351',
          src: 'https://t.co/etzJqmi2w2',
          city: null,
          state: null,
          lat: null,
          long: null,
          title: null,
          desc:
            'People attend the funeral of a woman who was shot dead yesterday while police were trying to disperse an anti-coup… https://t.co/FtVCv70s9U',
          language: 'en',
          force_rank: 'Rank 5 - Lethal Force',
          accuracy_estimate: 50,
          pending: true,
          approved: false,
          rejected: false,
        },
      ]);
    });
};
