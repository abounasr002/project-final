// // comment.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CommentService {
//   private apiUrl = 'http://localhost:3000/comments';

//   constructor(private http: HttpClient) {}

//   createComment(commentData: { postId: number, content: string }): Observable<any> {
//     return this.http.post(this.apiUrl, commentData);
//   }

//   getCommentsByPost(postId: number): Observable<any> {
//     return this.http.get(`${this.apiUrl}/post/${postId}`);
//   }

//   updateComment(commentId: number, content: string): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${commentId}`, { content });
//   }

//   deleteComment(commentId: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${commentId}`);
//   }
// }
























// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CommentService {
//   private apiUrl = 'http://localhost:3000/comments';

//   constructor(private http: HttpClient) {}

//   createComment(commentData: { postId: number, content: string }): Observable<any> {
//     return this.http.post(this.apiUrl, commentData);
//   }

//   getCommentsByPost(postId: number): Observable<any> {
//     return this.http.get(`${this.apiUrl}/post/${postId}`);
//   }

//   updateComment(commentId: number, content: string): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${commentId}`, { content });
//   }

//   deleteComment(commentId: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${commentId}`);
//   }
// }






// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class CommentService {
//   private apiUrl = 'http://localhost:3000/comments';

//   constructor(private http: HttpClient) {}

//   getCommentsByPost(postId: number): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/post/${postId}`).pipe(
//       catchError(error => {
//         console.error('Error loading comments:', error);
//         return of([]);
//       })
//     );
//   }

//   createComment(postId: number, content: string, userId: number): Observable<any> {
//     return this.http.post(this.apiUrl, {
//       postId,
//       content,
//       userId
//     }).pipe(
//       catchError(error => {
//         console.error('Error creating comment:', error);
//         throw error;
//       })
//     );
//   }

//   deleteComment(commentId: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${commentId}`).pipe(
//       catchError(error => {
//         console.error('Error deleting comment:', error);
//         throw error;
//       })
//     );
//   }
// }

















































import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private apiUrl = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) {}

  getCommentsByPost(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/?postId=${postId}`);
  }

  createComment(postId: number, body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${postId}`, body, {});
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${commentId}`);
  }
}
