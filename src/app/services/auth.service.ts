

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserValue: any;
  getCurrentUserId(): number {
    throw new Error('Method not implemented.');
  }
  // getCurrentUserId(): number | null {
  //   throw new Error('Method not implemented.');
  // }

  private API_URL = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  // Enregistrement des utilisateurs
  register(userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/register`, userData);
  }

  // Connexion utilisateur
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/login`, credentials, { withCredentials: true });
  }

  // Fermer la session (déconnexion)
  logout(): Observable<any> {
    return this.http.post(`${this.API_URL}/logout`, {}, { withCredentials: true });
  }


  getCurrentUser(): Observable<any> {
    return of({ id: 1, name: 'User' });
  }
}
