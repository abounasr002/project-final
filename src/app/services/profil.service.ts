// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Profil } from '../models/profil.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProfilService {
//   private API_URL = 'http://localhost:3000'; 

//   constructor(private http: HttpClient) {}

//   // Créer un profil
//   createProfil(profil: Profil): Observable<any> {
//     return this.http.post<any>(this.API_URL, profil);
//   }

//   // Obtenir un profil par l'ID de l'utilisateur
//   getProfilByUserId(utilisateurId: number): Observable<Profil> {
//     return this.http.get<Profil>(`${this.API_URL}/${utilisateurId}`);
//   }

//   // Mettre à jour un profil
//   updateProfil(utilisateurId: number, profil: Partial<Profil>): Observable<any> {
//     return this.http.put<any>(`${this.API_URL}/${utilisateurId}`, profil);
//   }

//   // Supprimer un profil
//   deleteProfil(utilisateurId: number): Observable<any> {
//     return this.http.delete<any>(`${this.API_URL}/${utilisateurId}`);
//   }
// }





// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Profil } from '../models/profil.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProfilService {

//   private API_URL = 'http://localhost:3000/profils';

//   constructor(private http: HttpClient) {}

//   // Création d'un profil
//   createProfil(profilData: Profil): Observable<any> {
//     return this.http.post(`${this.API_URL}`, profilData);
//   }

//   // Récupérer un profil par l'ID de l'utilisateur
//   getProfilByUserId(utilisateurId: number): Observable<Profil> {
//     return this.http.get<Profil>(`${this.API_URL}/${utilisateurId}`);
//   }

//   // Mise à jour d'un profil
//   updateProfil(utilisateurId: number, profilData: Partial<Profil>): Observable<any> {
//     return this.http.put(`${this.API_URL}/${utilisateurId}`, profilData);
//   }

//   // Suppression d'un profil
//   deleteProfil(utilisateurId: number): Observable<any> {
//     return this.http.delete(`${this.API_URL}/${utilisateurId}`);
//   }
// }

















// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Profil } from '../models/profil.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProfilService {
//   private apiUrl = 'http://localhost:3000/api/profils'; 

//   constructor(private http: HttpClient) {}

//   createProfil(profil: Profil): Observable<any> {
//     return this.http.post(this.apiUrl, profil);
//   }

//   getProfilById(id: number): Observable<Profil> {
//     return this.http.get<Profil>(`${this.apiUrl}/${id}`);
//   }

//   updateProfil(id: number, profil: Partial<Profil>): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, profil);
//   }

//   deleteProfil(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }
// }












// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Profil } from '../models/profil.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProfilService {
//   private apiUrl = 'http://localhost:3000/profils'; 

//   constructor(private http: HttpClient) {}

//   createProfil(profil: Profil): Observable<any> {
//     return this.http.post(this.apiUrl, profil);
//   }

//   getProfil(id: number): Observable<Profil> {
//     return this.http.get<Profil>(`${this.apiUrl}/${id}`);
//   }

//   updateProfil(id: number, data: Partial<Profil>): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, data);
//   }

//   deleteProfil(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }

//   getAllProfils(): Observable<Profil[]> {
//     return this.http.get<Profil[]>(this.apiUrl);
//   }
// }





























// src/app/services/profil.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Profil {
  id?: number;
  pseudo: string;
  bio: string;
  avatarUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  deleteProfil: any;
  // getProfil(_id: number) {
  //     throw new Error('Method not implemented.');
  // }

  getProfil(id: number): Observable<Profil | undefined> {
    // Replace with actual implementation, e.g., HTTP call
    return this.http.get<Profil | undefined>(`/api/profils/${id}`);
  }
  private baseUrl = 'http://localhost:3000/profils'; // Cambia el puerto si es diferente

  constructor(private http: HttpClient) {}

  createProfil(profil: Profil): Observable<any> {
    return this.http.post(this.baseUrl, profil);
  }

  getProfilById(id: string): Observable<Profil> {
    return this.http.get<Profil>(`${this.baseUrl}/${id}`);
  }

  updateProfil(id: string, profil: Profil): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, profil);
  }
}
