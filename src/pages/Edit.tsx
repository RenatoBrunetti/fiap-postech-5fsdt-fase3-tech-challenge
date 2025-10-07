import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { getPostRequest, updatePostRequest } from '../queries';

// Types
import type { Post as PostType } from '../types';

// Hooks
import useAuth from '../hooks/useAuth';

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0 16px;
`;

const EditInner = styled.div`
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

const EditTop = styled.div`
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

interface UpdatePostValues {
  title?: string;
  content?: string;
}

const Edit: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role?.name || 'student';

  const { postId } = useParams<{ postId: string }>();

  const initialPostRequest = useRef(false);

  const [post, setPost] = useState<PostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'admin') navigate('/');
    if (initialPostRequest.current) return;
    handleGetPost();
    initialPostRequest.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetPost = () => {
    const fetchPosts = async () => {
      if (!postId) return;
      const postResponse = await getPostRequest(api, postId);
      setPost(postResponse);
    };
    fetchPosts();
    setIsLoading(false);
  };

  const handleUpdatePost = (
    values: UpdatePostValues,
    { resetForm }: FormikHelpers<UpdatePostValues>,
  ) => {
    if (!post) return;
    if (values.title === post.title && values.content === post.content) {
      alert('Nenhuma alteração foi feita.');
      return;
    }
    const updatePost = async () => {
      await updatePostRequest(api, post.id, {
        ...values,
        userId: post.user.id,
      });
      resetForm();
      navigate('/');
    };
    updatePost();
  };

  const initialValues = {
    title: post?.title || '',
    content: post?.content || '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('O título é obrigatório'),
    content: Yup.string().required('O conteúdo é obrigatório'),
  });

  if (isLoading) return <Loader />;

  return (
    <EditContainer>
      <EditInner>
        <EditTop>
          <BackButtonNavigation />
        </EditTop>
        <h1>Editar Post</h1>
        <Formik<UpdatePostValues>
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={handleUpdatePost}
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
            <Button type="submit">Salvar</Button>
          </Form>
        </Formik>
      </EditInner>
    </EditContainer>
  );
};
export default Edit;
