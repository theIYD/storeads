import React from 'react';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  FormLabel,
  Button,
  Text,
  Link,
  useToast,
} from '@chakra-ui/core';
import { Formik, Field, FormikValues, FormikProps } from 'formik';
import axios from 'axios';
import { default as to } from 'await-to-js';

interface SignUp {
  email: string;
  password: string;
  name: string;
}

const Signup: React.FC = () => {
  const toast = useToast();

  const initialValues: SignUp = { email: '', password: '', name: '' };

  const submit = async (values: FormikValues, actions: any) => {
    const [err, response] = await to(
      axios.post(`${process.env.REACT_APP_API}/api/auth/signUp`, {
        name: values.name,
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
      toast({
        title: response.data.response.data,
        status: 'success',
        duration: 4000,
      });
      actions.setSubmitting(false);
      window.location.pathname = '/login';
    } else if (response && response.data.error) {
      toast({
        title: response.data.message,
        status: 'error',
        duration: 4000,
      });
    }
  };

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
          // validate={validateForm}
        >
          {(props: FormikProps<SignUp>) => (
            <form onSubmit={props.handleSubmit}>
              <Field name="name">
                {({ field, form }: any) => (
                  <FormControl
                    pb={4}
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input {...field} id="name" placeholder="Your name" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
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
                      placeholder="Your Email"
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
                Join
              </Button>
            </form>
          )}
        </Formik>
        <Text color="gray.500" fontSize="sm" textAlign="center" mt={4}>
          Already onboard ?{' '}
          <Link href="/login" _hover={{ color: '#000', fontWeight: 'bold' }}>
            Sign In
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Signup;
