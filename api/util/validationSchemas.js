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
  tweet_id: yup.string().trim().max(30).nullable(),
  user_name: yup.string().trim().max(100).nullable(),
  description: yup.string().required().trim().max(10000),
  city: yup.string().trim().max(50).nullable(),
  state: yup.string().trim().max(50).nullable(),
  lat: yup.number().max(50).nullable(),
  long: yup.number().max(50).nullable(),
  title: yup.string().trim().max(50),
  force_rank: yup.string().required().trim().min(2).max(50),
  status: yup
    .string()
    .trim()
    .matches(/(pending|approved|rejected)/i),
  confidence: yup.number().nullable(),
  tags: yup.array().nullable(),
  src: yup.array(),
});
