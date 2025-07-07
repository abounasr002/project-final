import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Follower {
  id: number;
  followerId: number;
  followingId: number;
}

@Injectable({
  providedIn: 'root'
})
export class FollowersService {
  private apiUrl = 'http://localhost:3000/followers'; // Cambia el puerto y url según tu backend

  constructor(private http: HttpClient) {}

  followUser(followerId: number, followingId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/follow`, { followerId, followingId });
  }

  unfollowUser(followerId: number, followingId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/unfollow`, { followerId, followingId });
  }

  getFollowers(userId: number): Observable<{ message: string; followers: Follower[] }> {
    return this.http.get<{ message: string; followers: Follower[] }>(`${this.apiUrl}/${userId}`);
  }

  getFollowing(userId: number): Observable<{ message: string; following: Follower[] }> {
    return this.http.get<{ message: string; following: Follower[] }>(`${this.apiUrl}/toto/${userId}`);
  }
}
