import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowersService {
  private baseUrl = 'http://localhost:3000/followers';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  /**
   * Envoyer une requête pour suivre un utilisateur
   */
  follow(followerId: number, followingId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/follow`, { followerId, followingId }, { headers });
  }

  /**
   * Envoyer une requête pour ne plus suivre un utilisateur
   */
  unfollow(followerId: number, followingId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/unfollow`, { followerId, followingId }, { headers });
  }

  /**
   * Obtenir la liste des utilisateurs suivis par l'utilisateur
   */
  getFollowing(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/toto/${userId}`, { headers });
  }

  /**
   * Obtenir la liste des abonnés de l'utilisateur
   */
  getFollowers(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/${userId}`, { headers });
  }
}

