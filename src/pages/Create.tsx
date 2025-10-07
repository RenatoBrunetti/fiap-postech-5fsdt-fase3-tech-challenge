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
import TextArea from '../components/Form/TextArea';
import Button from '../components/Form/Button';

// API Queries
import api from '../api';
import { createPostRequest } from '../queries';

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

interface CreatePostValues {
  title: string;
  content: string;
}

const Create: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role?.name || 'student';

  const initialCreateRequest = useRef(false);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'admin') navigate('/');
    if (initialCreateRequest.current) return;
    initialCreateRequest.current = true;
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreatePost = (
    values: CreatePostValues,
    { resetForm }: FormikHelpers<CreatePostValues>,
  ) => {
    if (!user?.id) return;
    const createPost = async () => {
      await createPostRequest(api, { ...values, userId: user.id });
      resetForm();
      navigate('/');
    };
    createPost();
  };

  const initialValues = {
    title: '',
    content: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('O título é obrigatório'),
    content: Yup.string().required('O conteúdo é obrigatório'),
  });

  if (isLoading) return <Loader />;

  return (
    <CreateContainer>
      <CreateInner>
        <CreateTop>
          <BackButtonNavigation />
        </CreateTop>
        <h1>Criar Post</h1>
        <Formik<CreatePostValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreatePost}
        >
          <Form>
            <Fieldset>
              <Label htmlFor="title">Título</Label>
              <FormikField as={Input} name="title" id="title" />
              <ErrorMessage name="title" component={ErrorText} />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="content">Conteúdo</Label>
              <FormikField as={TextArea} name="content" id="content" />
              <ErrorMessage name="content" component={ErrorText} />
            </Fieldset>
            <Button type="submit">Enviar</Button>
          </Form>
        </Formik>
      </CreateInner>
    </CreateContainer>
  );
};
export default Create;
