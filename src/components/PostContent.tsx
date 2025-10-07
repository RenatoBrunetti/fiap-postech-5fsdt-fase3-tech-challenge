import React from 'react';
import styled from 'styled-components';

import type { Post } from '../pages/Home';

interface PostContentProps {
  post: Post;
}

const PostContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.input.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.contrast};
  margin-top: 16px;
`;

const PostContentInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.xl};
  padding: 16px;

  h1 {
    margin: 0 0 16px 0;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.title};
  }
`;

const PostContentHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;

  p {
    margin: 0;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return (
    <PostContentContainer>
      <PostContentInner>
        <PostContentHeader>
          <p>Por {post.user.username}</p>
          <p>{new Date(post.created_at).toLocaleDateString('pt-BR')}</p>
        </PostContentHeader>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </PostContentInner>
    </PostContentContainer>
  );
};

export default PostContent;
