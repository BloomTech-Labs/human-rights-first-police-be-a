const yup = require('yup');

exports.incidentQuery = yup.object({
  state: yup
    .string()
    .trim()
    .min(2, 'state must be at least 2 characters long')
    .max(50, 'state must be at most 50 characters long'),

  city: yup
    .string()
    .trim()
    .min(2, 'city must be at least 2 characters long')
    .max(50, 'city must be at most 50 characters long'),

  startDate: yup.string().trim(),

  endDate: yup.string().trim(),
});

exports.incidentObject = yup.object({
  incident_date: yup.string().trim(),
  tweet_id: yup.string().trim().max(30),
  user_name: yup.string().trim().max(100),
  description: yup.string().required().trim().max(10000),
  city: yup.string().trim().max(50),
  state: yup.string().trim().max(50),
  lat: yup.string().trim().max(50),
  long: yup.string().trim().max(50),
  title: yup.string().trim().max(50),
  force_rank: yup.string().required().trim().max(50),
  status: yup
    .string()
    .trim()
    .matches(/(pending|approved|rejected)/i),
  confidence: yup.number(),
  tags: yup.array(),
  src: yup.array(),
});
