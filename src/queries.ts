import type { AxiosInstance, AxiosResponse } from 'axios';

// Types
import type { Post, Role, User } from './types';

// Status
export const getStatusRequest = async (
  api: AxiosInstance,
): Promise<AxiosResponse> => {
  try {
    const response = await api.get('/status');
    return response.data;
  } catch (error) {
    console.error('Error fetching status:', error);
    throw error;
  }
};

// Posts
export const getPostsRequest = async (api: AxiosInstance): Promise<Post[]> => {
  try {
    const response = await api.get('/posts');
    return response.data.length > 0 ? response.data : [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPostsSearchRequest = async (
  api: AxiosInstance,
  search: string,
): Promise<Post[]> => {
  try {
    const response = await api.get('/posts/search', { params: { search } });
    return response.data.length > 0 ? response.data : [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPostRequest = async (
  api: AxiosInstance,
  id: string,
): Promise<Post> => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

export const deletePostRequest = async (
  api: AxiosInstance,
  id: string,
  userId: string,
): Promise<void> => {
  try {
    await api.delete(`/posts/${id}`, {
      data: { user_id: userId },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

interface CreatePostRequestParams {
  title: string;
  content: string;
  userId: string;
}
export const createPostRequest = async (
  api: AxiosInstance,
  data: CreatePostRequestParams,
): Promise<Post> => {
  try {
    const { title, content, userId } = data;
    const response = await api.post('/posts', {
      title,
      content,
      user_id: userId,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

interface UpdatePostRequestParams {
  title?: string;
  content?: string;
  userId: string;
}
interface UpdatePostRequestBody {
  title?: string;
  content?: string;
  user_id: string;
}
export const updatePostRequest = async (
  api: AxiosInstance,
  postId: string,
  data: UpdatePostRequestParams,
): Promise<Post> => {
  try {
    const { title, content, userId } = data;
    const payload: UpdatePostRequestBody = { user_id: userId };
    if (title) payload.title = title;
    if (content) payload.content = content;
    const response = await api.put(`/posts/${postId}`, {
      title,
      content,
      user_id: userId,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Users
export const getUsersRequest = async (api: AxiosInstance): Promise<User[]> => {
  try {
    const response = await api.get('/users');
    return response.data.length > 0 ? response.data : [];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

interface CreateUserRequestParams {
  username: string;
  password: string;
  roleId: string;
}
export const createUserRequest = async (
  api: AxiosInstance,
  data: CreateUserRequestParams,
): Promise<User> => {
  try {
    const { username, password, roleId } = data;
    const response = await api.post('/users', {
      username,
      password,
      role_id: roleId,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Roles
export const getRolesRequest = async (api: AxiosInstance): Promise<Role[]> => {
  try {
    const response = await api.get('/roles');
    return response.data.length > 0 ? response.data : [];
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};

// Auth
export const loginRequest = async (
  api: AxiosInstance,
  data: { username: string; password: string },
): Promise<User | null> => {
  try {
    const { username, password } = data;
    const response = await api.post('/login', { username, password });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      return null;
    }
    throw error;
  }
};
