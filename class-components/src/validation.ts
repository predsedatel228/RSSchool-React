import * as yup from 'yup';

export const validation = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]+/, 'First character must be uppercase'),
  age: yup
    .number()
    .required('Age is required')
    .positive('Age must be positive')
    .integer('Age must be an integer'),
  email: yup.string().email().required('E-mail is required'),
  password: yup.string().required(),
  comfirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required(),
  accept: yup
    .boolean()
    .required()
    .oneOf([true], "You didn't accept Terms and Conditions"),
  image: yup
    .mixed<File[]>().required().test('name', 'File is required', value => {
      return value[0] && value[0].name !== '';
  })
  .test('fileSize', 'The file is too large', value => {
      return value[0] && value[0].size <= 1000000;
  })
  .test('type', 'We only support image', value => {
    return value[0] && value[0].type === 'image/jpeg' || value[0] && value[0].type === 'image/png';
}),
  country: yup.string().required(),
});
