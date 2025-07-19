
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

 
  getAll(): Observable<Utilisateur[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Utilisateur[]>(`${this.API_URL}/users`, {
      headers,
      withCredentials: true
    });
  }

 
  getMe(): Observable<Utilisateur> {
    const headers = this.getAuthHeaders();
    return this.http.get<Utilisateur>(`${this.API_URL}/users/me`, {
      headers,
      withCredentials: true
    });
  }


  searchUsers(term: string): Observable<Utilisateur[]> {
    const headers = this.getAuthHeaders();
    const params = new HttpParams().set('nom', term);
    return this.http.get<Utilisateur[]>(`${this.API_URL}/users/searchUsers`, {
      headers,
      withCredentials: true,
      params
    });
  }

  
updateUser(id: string | number, data: any): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.put(`${this.API_URL}/users/${id}`, data, {
    headers,
    withCredentials: true,
  });
}

  
  delete(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.API_URL}/users/${id}`, { headers });
  }
}
