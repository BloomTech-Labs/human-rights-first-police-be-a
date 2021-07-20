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
  date_created: yup.string().trim(),
  tweet_id: yup.string().required().trim().min(5).max(10),
  user_name: yup.string().required().trim().min(2).max(100),
  description: yup.string().required().trim().min(2).max(1000),
  city: yup.string().trim().min(2).max(50),
  state: yup.string().trim().min(2).max(50),
  lat: yup.string().trim().min(2).max(50),
  long: yup.string().trim().min(2).max(50),
  title: yup.string().trim().min(2).max(50),
  force_rank: yup.string().required().trim().min(2).max(50),
  status: yup
    .string()
    .required()
    .trim()
    .matches(/(pending|approved|rejected)/i, { excludeEmptyString: true }),
  confidence: yup.number(),
  tags: yup.string().required().trim(),
});
