import React from 'react';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Link,
  Text,
  FormLabel,
  Button,
  useToast,
} from '@chakra-ui/core';
import { Formik, Field, FormikValues, FormikProps } from 'formik';
import axios from 'axios';
import { default as to } from 'await-to-js';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const toast = useToast();

  const submit = async (values: FormikValues, actions: any) => {
    console.log('i am here');
    const [err, response] = await to(
      axios.post(`${process.env.REACT_APP_API}/api/auth/signIn`, {
        email: values.email,
        password: values.password,
      })
    );
    if (err) {
      toast({
        title: 'An error occurred. Please try again after some time.',
        status: 'error',
        duration: 1000,
      });
    }

    if (response && !response.data.error) {
      const token = response.data.accessToken;
      sessionStorage.setItem('accessToken', token);
      actions.setSubmitting(false);
      toast({
        title: 'Welcome back!',
        status: 'success',
        duration: 4000,
      });
      window.location.pathname = '/dashboard';
    } else if (response && response.data.error === 1) {
      toast({
        title: response.data.message,
        status: 'error',
        duration: 4000,
      });
    }
  };

  const initialValues: LoginForm = { email: '', password: '' };
  return (
    <Flex
      h={['100vh', '100vh', '80vh']}
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        flexDirection="column"
        p={['10%', '10%', '3%']}
        backgroundColor="white"
        boxShadow="lg"
        rounded="lg"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={submit}
          // validate={validate}
        >
          {(props: FormikProps<LoginForm>) => (
            <form onSubmit={props.handleSubmit}>
              <Field name="email">
                {({ field, form }: any) => (
                  <FormControl
                    pb={4}
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="Email Address"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="Password"
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme="purple"
                isLoading={props.isSubmitting}
                type="submit"
                size="sm"
                w="100%"
              >
                Sign In
              </Button>
            </form>
          )}
        </Formik>
        <Text color="gray.500" fontSize="sm" textAlign="center" mt={4}>
          Want to join ?{' '}
          <Link href="/signup" _hover={{ color: '#000', fontWeight: 'bold' }}>
            Sign Up
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Login;
