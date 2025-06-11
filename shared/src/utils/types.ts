export interface AuthenticatedUser {
  token: string;
  id: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  isPublished: boolean;
}

export interface Comment {
  id: number;
  content: string;
  authorId: number;
}

export interface PostWithComments extends Post {
  comments: Comment[];
}
