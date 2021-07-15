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
