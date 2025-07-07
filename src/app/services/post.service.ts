// // src/app/modules/post/services/post.service.ts

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Post } from '../models/Post';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class PostService {
//   private apiUrl = 'http://localhost:3000/posts';

//   constructor(private http: HttpClient) {}

//   getPosts(): Observable<Post[]> {
//     return this.http.get<Post[]>(this.apiUrl);
//   }

//   getPostById(id: number): Observable<Post> {
//     return this.http.get<Post>(`${this.apiUrl}/${id}`);
//   }

//   createPost(post: Post): Observable<Post> {
//     return this.http.post<Post>(this.apiUrl, post);
//   }

//   updatePost(id: number, post: Post): Observable<Post> {
//     return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
//   }

//   deletePost(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }
// }














// // src/app/services/post.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Post } from '../models/Post';
// import { Comment } from '../models/comment.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class PostService {
//   private apiUrl = 'http://localhost:3000';

//   constructor(private http: HttpClient) { }

//   // Posts
//   getPosts(): Observable<Post[]> {
//     return this.http.get<Post[]>(`${this.apiUrl}/posts`);
//   }

//   createPost(post: Post): Observable<Post> {
//     return this.http.post<Post>(`${this.apiUrl}/posts`, post);
//   }

//   deletePost(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/posts/${id}`);
//   }

//   likePost(postId: number): Observable<Post> {
//     return this.http.post<Post>(`${this.apiUrl}/posts/${postId}/like`, {});
//   }

//   // Comments
//   getCommentsByPost(postId: number): Observable<Comment[]> {
//     return this.http.get<Comment[]>(`${this.apiUrl}/comments/post/${postId}`);
//   }

//   createComment(comment: { postId: number, content: string }): Observable<Comment> {
//     return this.http.post<Comment>(`${this.apiUrl}/comments`, comment);
//   }

//   deleteComment(commentId: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/comments/${commentId}`);
//   }
// }







// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Post } from '../models/Post';

// @Injectable({ providedIn: 'root' })
// export class PostService {
//   private apiUrl = 'http://localhost:3000';

//   constructor(private http: HttpClient) {}

//   getPosts(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/posts?_expand=user`);
//   }

//   createPost(post: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/posts`, post);
//   }

//   deletePost(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/posts/${id}`);
//   }

//   likePost(postId: number): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/posts/${postId}/like`, {});
//   }
// }








































import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  private API_URL = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  createPost(postData: any): Observable<any> {
    return this.http.post(this.API_URL, postData);
  }

  deletePost(postId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${postId}`);
  }

  likePost(postId: number): Observable<any> {
    return this.http.post(`${this.API_URL}/${postId}/like`, {});
  }

  addComment(postId: number, commentData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/${postId}/comments`, commentData);
  }

  deleteComment(postId: number, commentId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${postId}/comments/${commentId}`);
  }
}