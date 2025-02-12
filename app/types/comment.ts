export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string | null;
  postId: number;
  usersId: number;
  username?: string;
}