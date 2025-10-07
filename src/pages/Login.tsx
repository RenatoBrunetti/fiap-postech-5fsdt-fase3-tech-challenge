import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  ErrorMessage,
  Formik,
  Field as FormikField,
  type FormikHelpers,
} from 'formik';
import * as Yup from 'yup';

import useAuth from '../hooks/useAuth';

import Form from '../components/Form/Form';
import Fieldset from '../components/Form/Fieldset';
import Label from '../components/Form/Label';
import Input from '../components/Form/Input';
import ErrorText from '../components/Form/ErrorText';
import Button from '../components/Form/Button';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LoginInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.contrast};
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;

  h2 {
    margin-bottom: 16px;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.title};
  }
`;

interface LoginValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  const handleLogin = (
    values: LoginValues,
    { resetForm }: FormikHelpers<LoginValues>,
  ) => {
    login(values);
    resetForm();
    navigate('/');
  };

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('O nome é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
  });

  return (
    <LoginContainer>
      <LoginInner>
        <h2>Login</h2>
        <Formik<LoginValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <Fieldset>
              <Label htmlFor="username">Usuário</Label>
              <FormikField as={Input} name="username" id="username" />
              <ErrorMessage name="username" component={ErrorText} />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="password">Senha</Label>
              <FormikField
                as={Input}
                name="password"
                id="password"
                type="password"
              />
              <ErrorMessage name="password" component={ErrorText} />
            </Fieldset>
            <Button type="submit">Enviar</Button>
          </Form>
        </Formik>
      </LoginInner>
    </LoginContainer>
  );
};
export default Login;
