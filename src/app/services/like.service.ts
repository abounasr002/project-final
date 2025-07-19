import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface LikePayload {
  userId: number;
  postId: number;
}

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private apiUrl = 'http://localhost:3000/likes'; 

  constructor(private http: HttpClient) {}

  addLike(userId: number, postId: number): Observable<any> {
    return this.http.post(this.apiUrl, { userId, postId });
  }

  removeLike(userId: number, postId: number): Observable<any> {
    return this.http.delete(this.apiUrl, { body: { userId, postId } });
  }

  getLikesByPost(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${postId}`);
  }
}
