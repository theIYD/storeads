import { FormikValues, FormikErrors } from 'formik';

interface Validator {
  email: string;
  password: string;
  name?: string;
}

interface Error {
  email?: string;
  password?: string;
  name?: string;
}

const validate = (values: FormikValues): FormikErrors<Error> => {
  const errors = {
    email: '',
    password: '',
    name: '',
  };

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  if (values.name && values.name === '') {
    errors.name = 'Name is required';
  }

  return errors;
};

export default validate;
