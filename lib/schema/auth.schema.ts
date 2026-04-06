import { maxFileSize } from '@/config/constants';
import { parsePhoneNumber } from 'react-phone-number-input';
import * as yup from 'yup';
import { strictEmailRegex } from '../regex';

export const signupSchemaUser = yup.object().shape({
  fullName: yup
    .string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(250, 'Full name must not exceed 50 characters'),
  email: yup
    .string()
    .required('Email is required')
    .matches(strictEmailRegex, 'Please enter a valid email address'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Please enter 10-digit phone number'),
  password: yup
    .string()
    .trim()
    .max(50, 'Maximum 50 charecters allowed')
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'At least one lowercase letter required')
    .matches(/[A-Z]/, 'At least one uppercase letter required')
    .matches(/\d/, 'At least one number required')
    .matches(/[^\w\s]/, 'At least one special character required'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  agreeToTerms: yup
    .boolean()
    .required('You must agree to the terms and conditions')
    .oneOf([true], 'You must agree to the terms and conditions'),
});

export const singupSchemaInterpreter = yup.object().shape({
  fullName: yup
    .string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(250, 'Full name must not exceed 50 characters'),
  email: yup
    .string()
    .required('Email is required')
    .matches(strictEmailRegex, 'Please enter a valid email address'),
  phoneNumber: yup
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
  password: yup
    .string()
    .trim()
    .max(50, 'Maximum 50 charecters allowed')
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'At least one lowercase letter required')
    .matches(/[A-Z]/, 'At least one uppercase letter required')
    .matches(/\d/, 'At least one number required')
    .matches(/[^\w\s]/, 'At least one special character required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  agreeToSms: yup.boolean(),
});

export const businessDetailsSchema = yup.object({
  businessLogo: yup
    .mixed<File>()
    .required('Business logo is required')
    .test('fileExists', 'Business logo is required', value => {
      return value instanceof File;
    })
    .test('fileSize', 'File size should be less than 20MB', value => {
      if (!value || !(value instanceof File)) return false;
      return value.size <= maxFileSize; // 20MB
    })
    .test('fileType', 'Only PNG, JPG, JPEG files are supported', value => {
      if (!value || !(value instanceof File)) return false;
      const supportedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      return supportedTypes.includes(value.type);
    }),
  businessName: yup
    .string()
    .required('Business name is required')
    .min(2, 'Business name must be at least 2 characters'),
  businessEmail: yup
    .string()
    .required('Email is required')
    .matches(strictEmailRegex, 'Please enter a valid email address'),
  businessSector: yup.string().required('Business sector is required'),
  representativeName: yup
    .string()
    .required('Representative name is required')
    .min(2, 'Representative name must be at least 2 characters'),
  title: yup.string().optional(),
  businessPhone: yup
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
  streetAddress: yup
    .string()
    .required('Street address is required')
    .min(5, 'Address must be at least 5 characters'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zipCode: yup
    .string()
    .required('Zip code is required')
    .matches(/^\d{5,6}$/, 'Please enter a valid zip code (5-6 digits)'),
  businessWebsite: yup.string().url('Please enter a valid website URL').optional(),
});

export const userLoginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(strictEmailRegex, 'Please enter a valid email address'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  remember: yup.boolean(),
});

export const setNewPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .trim()
    .max(50, 'Maximum 50 charecters allowed')
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'At least one lowercase letter required')
    .matches(/[A-Z]/, 'At least one uppercase letter required')
    .matches(/\d/, 'At least one number required')
    .matches(/[^\w\s]/, 'At least one special character required'),
  reEnterPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your password'),
});

export const InterPreterSignup2 = yup.object({
  areaOfExpertise: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Select at least one skill')
    .required('Area of expertise is required'),
  supportedLanguages: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Select at least one language')
    .required('Language is required'),
  address: yup
    .string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters'),
  gender: yup.string().required('Please select your gender'),
  aboutMe: yup
    .string()
    .required('Please tell us about you.')
    .max(500, 'About me must be less than 500 characters'),
  certificatesFiles: yup
    .array()
    .of(yup.mixed<File>().required())
    .max(5, 'Maximum 5 certificate files allowed')
    .test('filesValidation', 'Invalid files', function (files) {
      if (!files || !Array.isArray(files)) return false;

      for (const file of files) {
        if (!(file instanceof File)) {
          return this.createError({ message: 'Invalid file type' });
        }

        const supportedFormats = ['image/png', 'image/jpeg', 'application/pdf'];
        const maxSize = maxFileSize;

        if (!supportedFormats.includes(file.type)) {
          return this.createError({ message: `${file.name}: Unsupported file format` });
        }

        if (file.size > maxSize) {
          return this.createError({ message: `${file.name}: File size must be less than 2MB` });
        }
      }
      return true;
    })
    .required(),
  idFiles: yup
    .array()
    .of(yup.mixed<File>().required())
    .min(1, 'Please upload at least one identification document')
    .max(5, 'Maximum 5 ID files allowed')
    .test('filesValidation', 'Invalid files', function (files) {
      if (!files || !Array.isArray(files)) return false;

      for (const file of files) {
        if (!(file instanceof File)) {
          return this.createError({ message: 'Invalid file type' });
        }

        const supportedFormats = ['image/png', 'image/jpeg', 'application/pdf'];
        const maxSize = maxFileSize;

        if (!supportedFormats.includes(file.type)) {
          return this.createError({ message: `${file.name}: Unsupported file format` });
        }

        if (file.size > maxSize) {
          return this.createError({ message: `${file.name}: File size must be less than 2MB` });
        }
      }
      return true;
    })
    .required(),
  w9Form: yup
    .mixed<File>()
    .required('W9 form is required')
    .test('fileType', 'Only PDF files are allowed', file => {
      if (!file) return false;
      return file instanceof File && file.type === 'application/pdf';
    })
    .test('fileSize', 'File size must be less than 2MB', file => {
      if (!file) return false;
      return file.size <= maxFileSize;
    }),
  socialSecurityNumber: yup.string(),
  ein: yup.string(),
});
