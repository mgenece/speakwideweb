import { parsePhoneNumber } from 'react-phone-number-input';
import * as yup from 'yup';
import { strictEmailRegex } from '../regex';

export const interpreterProfieUpdateSchema = yup
  .object({
    fullName: yup.string().required('Full name is required'),
    email: yup
      .string()
      .required('Email is required')
      .matches(strictEmailRegex, 'Please enter a valid email address'),
    phone: yup.string().required('Phone number is required'),
    address: yup.string().required('Address is required'),
    gender: yup.string().required('Gender is required'),
    aboutMe: yup
      .string()
      .required('About me is required')
      .min(10, 'About me must be at least 10 characters'),
    ssn: yup
      .string()
      .optional()
      .test('ssn-format', 'SSN must be 9 digits', value => !value || value.length === 9),
    ein: yup
      .string()
      .optional()
      .test('ein-format', 'EIN must be 9 digits', value => !value || value.length === 9),
    language: yup
      .array()
      .min(1, 'At least one language must be selected')
      .required('Supported languages are required'),
    areaOfExpertise: yup
      .array()
      .min(1, 'At least one area of expertise must be selected')
      .required('Area of expertise is required'),
    certificates: yup
      .array()
      .min(1, 'At least one certificate is required')
      .required('Certificates are required'),
    idProof: yup
      .array()
      .min(1, 'At least one ID proof is required')
      .required('ID proof is required'),
  })
  .test({
    name: 'ssn-or-ein-required',
    message: 'Either SSN or EIN is required',
    test: function (value) {
      const { ssn, ein } = value;

      if ((!ssn || ssn.length === 0) && (!ein || ein.length === 0)) {
        return this.createError({
          path: 'ssn',
          message: 'Either SSN or EIN is required',
        });
      }

      return true;
    },
  });

export const userProfileEditSchema = yup.object().shape({
  // Personal Information
  full_name: yup.string().required('Full name is required'),
  email: yup
    .string()
    .required('Email is required')
    .matches(strictEmailRegex, 'Please enter a valid email address'),
  phone: yup.string().required('Phone number is required'),

  // Business Information
  business_name: yup.string().optional().default(''),
  business_email: yup
    .string()
    .optional()
    .default('')
    .when('business_name', {
      is: (val: string) => val && val.length > 0,
      then: schema =>
        schema
          .email('Please enter a valid business email')
          .required('Business email is required when business name is provided'),
      otherwise: schema => schema.email('Please enter a valid business email'),
    }),
  business_phone: yup
    .string()
    .required('Phone number is required')
    .test('valid-phone', 'Please enter a valid phone number', value => {
      if (!value) return true; // Allow empty - required() will handle it
      try {
        const phoneNumber = parsePhoneNumber(value);
        return phoneNumber?.isValid() ?? false;
      } catch {
        return false;
      }
    }),
  representative_name: yup.string().optional().default(''),
  representative_title: yup.string().optional().default(''),
  business_website: yup.string().optional().default('').url('Please enter a valid website URL'),
  business_sector: yup.string().optional().default(''),

  // Business Logo - can be either File or string
  businessLogo: yup.mixed<File | string>().optional().default(''),

  // Location Information
  zipcode: yup
    .string()
    .optional()
    .default('')
    .matches(/^\d*$/, 'Zip code must contain only digits'),
  city: yup.string().optional().default(''),
  state: yup.string().optional().default(''),
  street: yup.string().optional().default(''),
});
