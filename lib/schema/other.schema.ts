import * as yup from 'yup';

export const createDisputeSchema = yup
  .object({
    session_ref_number: yup.string().required('Session reference is required'),

    category: yup.array().of(yup.string()).min(1, 'Select at least one category').required(),

    issue_details: yup.string().required('Describe the issue'),

    interpreter_noshow: yup
      .string()
      .oneOf(['yes', 'no'])
      .required('Please indicate whether the interpreter was a no-show'),

    waiting_hr: yup
      .string()
      .nullable()
      .when('interpreter_noshow', (interpreterNoShow, schema) => {
        if (interpreterNoShow.includes('yes')) {
          return schema.required('Please select hours waited');
        }
        return schema;
      }),

    waiting_min: yup
      .string()
      .nullable()
      .when('interpreter_noshow', (interpreterNoShow, schema) => {
        if (interpreterNoShow.includes('yes')) {
          return schema.required('Please select minutes waited');
        }
        return schema;
      }),

    quality: yup
      .string()
      .oneOf(['poor', 'fair', 'good', 'excellent'])
      .required('Please rate the quality'),

    interpreter_ontime: yup
      .string()
      .oneOf(['yes', 'no'])
      .required('Please indicate if the interpreter arrived on time'),

    late_hr: yup
      .string()
      .nullable()
      .when('interpreter_ontime', (interpreterOnTime, schema) => {
        if (interpreterOnTime.includes('no')) {
          return schema.required('Please select hours late');
        }
        return schema;
      }),

    late_min: yup
      .string()
      .nullable()
      .when('interpreter_ontime', (interpreterOnTime, schema) => {
        if (interpreterOnTime.includes('no')) {
          return schema.required('Please select minutes late');
        }
        return schema;
      }),

    is_proper_duration: yup
      .string()
      .oneOf(['yes', 'no'])
      .required('Please indicate whether the service duration was as agreed'),

    actual_hr: yup
      .string()
      .nullable()
      .when('is_proper_duration', (isProperDuration, schema) => {
        if (isProperDuration.includes('no')) {
          return schema.required('Please select actual hours');
        }
        return schema;
      }),

    actual_min: yup
      .string()
      .nullable()
      .when('is_proper_duration', (isProperDuration, schema) => {
        if (isProperDuration.includes('no')) {
          return schema.required('Please select actual minutes');
        }
        return schema;
      }),

    has_legal_violation: yup
      .string()
      .oneOf(['yes', 'no'])
      .required('Please indicate whether there was a legal violation'),

    legal_violation_type: yup
      .string()
      .nullable()
      .when('has_legal_violation', (hasLegalViolation, schema) => {
        if (hasLegalViolation.includes('yes')) {
          return schema.required('Please specify legal violation type');
        }
        return schema;
      }),

    has_safety_concern: yup
      .string()
      .oneOf(['yes', 'no'])
      .required('Please indicate whether there were safety concerns'),

    safety_concern_type: yup
      .string()
      .nullable()
      .when('has_safety_concern', (hasSafetyConcern, schema) => {
        if (hasSafetyConcern.includes('yes')) {
          return schema.required('Please specify safety concern type');
        }
        return schema;
      }),

    amount_paid: yup
      .number()
      .typeError('Amount paid must be a number')
      .required('Amount paid is required')
      .min(0, 'Amount paid must be >= 0'),

    supporting_documents: yup
      .array()
      .of(yup.mixed())
      .required('Please upload supporting documentation')
      .min(1, 'Please upload at least one supporting document'),

    certify: yup.boolean().oneOf([true], 'You must certify the information'),
    false_claims_ack: yup.boolean().oneOf([true], 'You must acknowledge false claims warning'),
    cooperate_ack: yup.boolean().oneOf([true], 'You must agree to cooperate'),
  })
  .required();
