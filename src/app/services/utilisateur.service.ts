// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Utilisateur } from '../models/utilisateur.model'; // Adjust the path as needed
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UtilisateurService {
//   private apiUrl = 'http://localhost:3000';

//   constructor(private http: HttpClient) {}

//   getAll(): Observable<Utilisateur[]> {
//     return this.http.get<Utilisateur[]>(this.apiUrl);
//   }

//   create(utilisateur: Utilisateur): Observable<Utilisateur> {
//     return this.http.post<Utilisateur>(this.apiUrl, utilisateur);
//   }

//   update(id: number, utilisateur: Partial<Utilisateur>): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, utilisateur);
//   }

//   delete(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }

//   updateRole(id: number, role: string): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}/role`, { role });
//   }

//   search(params: any): Observable<Utilisateur[]> {
//     return this.http.get<Utilisateur[]>(`${this.apiUrl}/search`, { params });
//   }
// }











import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private API_URL = 'http://localhost:3000'; // Asegúrate de tener la URL correcta

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/utilisateurs`);
  }

  // Obtener un usuario por su ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/utilisateurs/${id}`);
  }

  // Crear un nuevo usuario
  create(userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/utilisateurs`, userData);
  }

  // Actualizar un usuario existente
  update(id: number, userData: any): Observable<any> {
    return this.http.put(`${this.API_URL}/utilisateurs/${id}`, userData);
  }

  // Eliminar un usuario
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/utilisateurs/${id}`);
  }
}
