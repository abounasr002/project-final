// export interface Post {
//   id?: number;
//   userId: number;
//   content: string;
//   media?: string;
//   link?: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

import { Utilisateur } from "./utilisateur.model";





export interface Post {
  id?: number;
  userId?: number;
  content?: string;
  media?: string;
  link?: string;
  createdAt?: Date;
  updatedAt?: Date;
  comments?: Comment[];
  likes?: number;
}

export interface PostWithUser extends Post {
  utilisateur?: Utilisateur
}











export interface Comment {
  id?: number;
  userId: number;
  postId: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: { id: number, name: string, avatar?: string };
}