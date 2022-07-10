import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';
import React, { FormEventHandler, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Card from '@/components/Card';
import DividerWithText from '@/components/DividerWithText';
import Head from '@/components/Head';
import Link from '@/components/Link';
// import Link from '@/components/Link';
import PasswordInput from '@/components/PasswordInput';
import { useAuth } from '@/context/auth';
// import { useUser } from '@/context/user';
// import http from '@/utils/http';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, signUp } = useAuth();
  const navigate = useNavigate();
  //   const { setToken } = useUser();

  const login: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      //   const { data: token } = await http.post('/api/user/login', {
      //     email,
      //     password,
      //   });
      //   setToken(token);
      await signUp({
        email,
        password,
      });
      navigate('/');
    } catch {
      alert('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head title="Login" />
      <Box maxW="md" mx="auto" mt="24">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Sign in to your account
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">Don&apos;t have an account?</Text>
          <Link to="/register" ml="2">
            Register here
          </Link>
        </Text>
        <Card>
          <chakra.form onSubmit={login}>
            <Stack spacing="6">
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  name="email"
                  // type="email"
                  // autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                Sign Up
              </Button>
            </Stack>
          </chakra.form>{' '}
          <DividerWithText mt="6" mb="4">
            or continue with
          </DividerWithText>
          <Box>
            {/* <Button color="currentColor" variant="outline">
                  <VisuallyHidden>Login with Facebook</VisuallyHidden>
                  <FaFacebook />
                </Button>
                <Button color="currentColor" variant="outline">
                  <VisuallyHidden>Login with Google</VisuallyHidden>
                  <FaGoogle />
                </Button> */}
            <Button
              color="currentColor"
              variant="outline"
              leftIcon={<FaGithub />}
              w="100%">
              <VisuallyHidden>Login with Github</VisuallyHidden>
              Github
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default SignUpPage;
