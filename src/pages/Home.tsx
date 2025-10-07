import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import CreatePostButton from '../components/CreatePostButton';
import PostTable from '../components/PostTable';
import Search from '../components/Search';
import Loader from '../components/Loader';
import AdminBard from '../components/AdminBard';

// API Queries
import api from '../api';
import {
  deletePostRequest,
  getPostsRequest,
  getPostsSearchRequest,
} from '../queries';

// Types
import type { Post } from '../types';

// Hooks
import useAuth from '../hooks/useAuth';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0 16px;
`;

const HomeInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.xl};
`;

const HomeTop = styled.div`
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

const Home: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role?.name || 'student';

  const initialHomeRequest = useRef(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (initialHomeRequest.current) return;
    handleGetPosts();
    initialHomeRequest.current = true;
  }, []);

  const handleGetPosts = () => {
    const fetchPosts = async () => {
      const postsResponse = await getPostsRequest(api);
      setPosts(postsResponse);
    };
    fetchPosts();
    setIsLoading(false);
  };

  const handleDelete = (id: string, userId: string) => {
    const confirm = window.confirm('Tem certeza que deseja deletar este post?');
    if (confirm) {
      setIsLoading(true);
      const deletePost = async () => {
        await deletePostRequest(api, id, userId);
        handleGetPosts();
      };
      deletePost();
    }
  };

  const handlePostsSearch = (query: string) => {
    setIsLoading(true);
    if (query !== '') {
      const fetchSearchPosts = async () => {
        const postsResponse = await getPostsSearchRequest(api, query);
        setPosts(postsResponse);
      };
      fetchSearchPosts();
      setIsLoading(false);
    } else {
      handleGetPosts();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <HomeContainer>
      <HomeInner>
        <HomeTop>
          <Search handlePostsSearch={handlePostsSearch} />
          {role === 'admin' && (
            <AdminBard>
              <CreatePostButton />
            </AdminBard>
          )}
        </HomeTop>
        {posts.length > 0 && (
          <PostTable role={role} posts={posts} handleDelete={handleDelete} />
        )}
      </HomeInner>
    </HomeContainer>
  );
};

export default Home;
