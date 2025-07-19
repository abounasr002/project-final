import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';

@Injectable({ providedIn: 'root' })
export class PostService {
  private API_URL = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    return this.http.get<Post[]>(this.API_URL);
  }

  createPost(body: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }
    const headers = {'Authorization': `Bearer ${token}`,};
  
    return this.http.post<Post>(`${this.API_URL}`, body, {headers,withCredentials: true});
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

  getPostsByUserId(userId: string): Observable<Post[]> {
  return this.http.get<Post[]>(`${this.API_URL}/users/${userId}`);
}
}