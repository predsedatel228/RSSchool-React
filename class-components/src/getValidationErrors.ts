import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string[];
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};
  err.inner.forEach(error => {
    if (!validationErrors[error.path as string]) {
      validationErrors[error.path as string] = [];
    }
    if (error.message.length > 1) {
      validationErrors[error.path as string].push(error.message);
    }
  });

  return validationErrors;
}