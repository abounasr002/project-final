import { Utilisateur } from "./utilisateur.model";

export interface Comment {
  id?: number;
  userId: number;
  postId: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: { id: number, name: string, avatar?: string };
}

export interface CommentWithUser extends Comment {
  utilisateur?: Utilisateur
}