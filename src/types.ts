export interface Role {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: string;
  username: string;
  role_id: string;
  role: Role;
  created_at?: string;
  updated_at?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  user: User;
  created_at: string;
  updated_at?: string;
}
