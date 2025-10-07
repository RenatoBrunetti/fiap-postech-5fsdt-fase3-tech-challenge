import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Edit, Trash, Eye } from 'lucide-react';

// Types
import type { Post } from '../types';

const PostTableInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin-top: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex: 1;
    justify-content: center;
  }
`;

const PostTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 8px 0;
  width: 100%;
`;

const PostTableRow = styled.div<{ header: string }>`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${({ theme }) => theme.colors.input.border};
  width: 100%;
  font-weight: ${({ header }) => (header === 'true' ? '600' : '400')};
  background: ${({ header, theme }) =>
    header === 'true' ? theme.colors.contrast : 'none'};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.colors.input.border};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const PostTableCell = styled.div`
  display: flex;
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
  padding: 6px;
  border-right: 1px solid ${({ theme }) => theme.colors.input.border};
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: 1rem;

  &:last-child {
    border-right: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.85rem !important;
  }
`;

const PostLink = styled(Link)`
  display: flex;
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
  padding: 6px;
  border-right: 1px solid ${({ theme }) => theme.colors.input.border};
  justify-content: center;
  align-items: center;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.alternative};
  }

  &:last-child {
    border-right: none;
  }
`;

const PostActionLink = styled(Link)<{ type?: string }>`
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme, type }) =>
    type === 'edit' ? theme.colors.warning : theme.colors.alternative};
  padding: 0 6px;

  &:hover {
    opacity: 0.8;
  }
`;

const PostActionButton = styled.button<{ type?: string }>`
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme, type }) =>
    type === 'delete' ? theme.colors.alert : theme.colors.alternative};

  &:hover {
    opacity: 0.8;
  }
`;

interface PostTableProps {
  role: string;
  posts: Post[];
  handleDelete: (id: string, userId: string) => void;
}

const PostTable: React.FC<PostTableProps> = ({ role, posts, handleDelete }) => {
  const numberOfCharacters = 20;

  return (
    <PostTableInner>
      <PostTableContainer>
        <PostTableRow header="true">
          <PostTableCell>Título</PostTableCell>
          <PostTableCell>Descrição</PostTableCell>
          <PostTableCell>Autor</PostTableCell>
          <PostTableCell>Data</PostTableCell>
          <PostTableCell>Ações</PostTableCell>
        </PostTableRow>
        {posts.length > 0 &&
          posts.map((post, index) => (
            <PostTableRow key={index} header="false">
              <PostLink to={`/post/${post.id}`} state={{ role }}>
                {post.title.slice(0, numberOfCharacters).concat('...')}
              </PostLink>
              <PostLink to={`/post/${post.id}`} state={{ role }}>
                {post.content.slice(0, numberOfCharacters).concat('...')}
              </PostLink>
              <PostTableCell>{post.user.username}</PostTableCell>
              <PostTableCell>
                {new Date(post.created_at).toISOString().slice(0, 10)}
              </PostTableCell>
              <PostTableCell>
                <PostActionLink
                  to={`/post/${post.id}`}
                  state={{ role }}
                  type="view"
                >
                  <Eye size={18} />
                </PostActionLink>
                {role === 'admin' && (
                  <>
                    <PostActionLink to={`/edit/${post.id}`} type="edit">
                      <Edit size={18} />
                    </PostActionLink>
                    <PostActionButton
                      onClick={() => handleDelete(post.id, post.user.id)}
                      type="delete"
                    >
                      <Trash size={18} />
                    </PostActionButton>
                  </>
                )}
              </PostTableCell>
            </PostTableRow>
          ))}
      </PostTableContainer>
      <PostTableContainer></PostTableContainer>
    </PostTableInner>
  );
};

export default PostTable;
