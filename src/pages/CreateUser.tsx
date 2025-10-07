import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  ErrorMessage,
  Formik,
  Field as FormikField,
  type FormikHelpers,
} from 'formik';
import * as Yup from 'yup';

import BackButtonNavigation from '../components/BackButton';
import Loader from '../components/Loader';
import Form from '../components/Form/Form';
import Fieldset from '../components/Form/Fieldset';
import Label from '../components/Form/Label';
import Input from '../components/Form/Input';
import ErrorText from '../components/Form/ErrorText';
import Button from '../components/Form/Button';

// API Queries
import api from '../api';
import { createUserRequest, getRolesRequest } from '../queries';

// Types
import type { Role } from '../types';

// Hooks
import useAuth from '../hooks/useAuth';

const CreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0 16px;
`;

const CreateInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.xl};

  h1 {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.title};
  }
`;

const CreateTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 16px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

interface CreateUserValues {
  username: string;
  password: string;
}

const CreateUser: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || 'user';

  const initialUserRequest = useRef(false);

  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'admin') navigate('/');
    if (initialUserRequest.current) return;
    handleGetRoles();
    initialUserRequest.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetRoles = () => {
    const fetchRoles = async () => {
      const rolesResponse = await getRolesRequest(api);
      setRoles(rolesResponse);
    };
    fetchRoles();
    setIsLoading(false);
  };

  const handleCreateUser = (
    values: CreateUserValues,
    { resetForm }: FormikHelpers<CreateUserValues>,
  ) => {
    if (!roles || !roles.length) return;
    const adminRole = roles.find((role) => role.name === 'admin');
    if (!adminRole) return;
    const createUser = async () => {
      await createUserRequest(api, {
        ...values,
        roleId: adminRole.id,
      });
      resetForm();
      navigate('/');
    };
    createUser();
  };

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('O nome é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter pelo menos 6 caracteres'),
  });

  if (isLoading) return <Loader />;

  return (
    <CreateContainer>
      <CreateInner>
        <CreateTop>
          <BackButtonNavigation />
        </CreateTop>
        <h1>Criar Autor</h1>
        <Formik<CreateUserValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreateUser}
        >
          <Form>
            <Fieldset>
              <Label htmlFor="username">Nome</Label>
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
      </CreateInner>
    </CreateContainer>
  );
};
export default CreateUser;
