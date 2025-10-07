import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import AdminBard from '../components/AdminBard';
import BackButtonNavigation from '../components/BackButton';
import DeletePostButton from '../components/DeletePostButton';
import EditPostButtonNavigation from '../components/EditPostButtonNavigation';
import Loader from '../components/Loader';
import PostContent from '../components/PostContent';

// API Queries
import api from '../api';
import { deletePostRequest, getPostRequest } from '../queries';

// Types
import type { Post as PostType } from '../types';

// Hooks
import useAuth from '../hooks/useAuth';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0 16px;
`;

const PostInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.xl};
`;

const PostTop = styled.div`
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

const Post: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role?.name || 'student';

  const { postId } = useParams<{ postId: string }>();

  const initialPostRequest = useRef(false);

  const [post, setPost] = useState<PostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
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

  const handleDeletePost = (id: string, userId: string) => {
    const confirm = window.confirm('Tem certeza que deseja deletar este post?');
    if (confirm) {
      setIsLoading(true);
      const deletePost = async () => {
        await deletePostRequest(api, id, userId);
      };
      deletePost();
      navigate('/');
    }
  };

  return (
    <PostContainer>
      <PostInner>
        <PostTop>
          {role === 'admin' && post && postId && postId !== '' && (
            <AdminBard>
              <EditPostButtonNavigation to={`/edit/${postId}`} />
              <DeletePostButton
                onClick={() => handleDeletePost(post.id, post.user.id)}
              />
            </AdminBard>
          )}
          <BackButtonNavigation />
        </PostTop>
        {isLoading && <Loader />}
        {post && <PostContent post={post} />}
      </PostInner>
    </PostContainer>
  );
};
export default Post;
