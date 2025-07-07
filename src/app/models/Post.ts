// export interface Post {
//   id?: number;
//   userId: number;
//   content: string;
//   media?: string;
//   link?: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }





export interface Post {
isLiked: any;
  id?: number;
  userId: number;
  content: string;
  media?: string;
  link?: string;
  createdAt?: Date;
  updatedAt?: Date;
  comments?: Comment[];
  likes?: number;
  user?: { id: number, name: string, avatar?: string };
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