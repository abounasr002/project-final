// import { Component, OnInit } from '@angular/core';
// import { FollowersService } from '../services/followers.service';
// import { UtilisateurService } from '../services/utilisateur.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-followers-list',
//   templateUrl: './followers-list.component.html',
//   styleUrls: ['./followers-list.component.css'],
//   standalone: true,
//   imports: [CommonModule, FormsModule]
// })
// export class FollowersListComponent implements OnInit {
//   users: any[] = [];
//   followingIds: number[] = [];
//   currentUserId: number = 0;
//   isLoading: boolean = true;
//   errorMessage: string = '';
//   searchTerm: string = '';

//   constructor(
//     private followersService: FollowersService,
//     private utilisateurService: UtilisateurService
//   ) {}

//   ngOnInit(): void {
//     this.loadUserData();
//   }

//   loadUserData(): void {
//     this.isLoading = true;
//     this.errorMessage = '';
    
//     this.utilisateurService.getMe().subscribe({
//       next: (me) => {
//         this.currentUserId = me.id;
//         this.loadFollowingUsers();
//       },
//       error: (err) => {
//         console.error('Error al obtener usuario actual', err);
//         this.handleError(err);
//       }
//     });
//   }

//   loadFollowingUsers(): void {
//     this.followersService.getFollowing(this.currentUserId).subscribe({
//       next: (response: any) => {
//         try {
//           console.log('Respuesta del backend:', response);
          
//           // Maneja diferentes formatos de respuesta
//           const relations = this.extractRelationsFromResponse(response);
//           this.followingIds = relations.map((r: any) => r.followingId || r.id);
          
//           this.loadAllUsers();
//         } catch (error) {
//           this.handleError(error);
//         }
//       },
//       error: (err) => this.handleError(err)
//     });
//   }

//   loadAllUsers(): void {
//     this.utilisateurService.getAll().subscribe({
//       next: (allUsers: any[]) => {
//         this.users = allUsers.filter(u => this.followingIds.includes(u.id));
//         this.isLoading = false;
//       },
//       error: (err) => this.handleError(err)
//     });
//   }

//   unfollow(userId: number): void {
//     if (!confirm('¿Estás seguro de que quieres dejar de seguir a este usuario?')) {
//       return;
//     }

//     this.followersService.unfollow(this.currentUserId, userId).subscribe({
//       next: () => {
//         this.followingIds = this.followingIds.filter(id => id !== userId);
//         this.users = this.users.filter(u => u.id !== userId);
//       },
//       error: (err) => {
//         console.error('Error al dejar de seguir', err);
//         alert('No se pudo completar la acción');
//       }
//     });
//   }

//   getRandomColor(): string {
//     const colors = [
//       '#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', 
//       '#1abc9c', '#d35400', '#34495e', '#16a085', '#c0392b'
//     ];
//     return colors[Math.floor(Math.random() * colors.length)];
//   }

//   private extractRelationsFromResponse(response: any): any[] {
//     if (!response) return [];
    
//     if (Array.isArray(response)) return response;
//     if (Array.isArray(response?.data)) return response.data;
//     if (Array.isArray(response?.following)) return response.following;
//     if (Array.isArray(response?.relations)) return response.relations;
    
//     console.warn('Formato de respuesta no reconocido:', response);
//     return [];
//   }

//   private handleError(error: any): void {
//     console.error('Error:', error);
//     this.isLoading = false;
    
//     if (error.status === 401) {
//       this.errorMessage = 'Sesión expirada - Por favor inicia sesión nuevamente';
//     } else if (error.status === 404) {
//       this.errorMessage = 'Endpoint no encontrado - Verifica la conexión con el backend';
//     } else if (error.status === 500) {
//       this.errorMessage = 'Error del servidor - Intenta nuevamente más tarde';
//     } else {
//       this.errorMessage = 'Error al cargar datos - Verifica tu conexión';
//     }
//   }

//   get filteredUsers() {
//     if (!this.searchTerm) return this.users;
    
//     return this.users.filter(user => 
//       user.nom?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//       user.pseudo?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//       user.bio?.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );
//   }
// }





















































// import { Component, OnInit } from '@angular/core';
// import { FollowersService } from '../services/followers.service';
// import { UtilisateurService } from '../services/utilisateur.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-followers-list',
//   templateUrl: './followers-list.component.html',
//   styleUrls: ['./followers-list.component.css'],
//   standalone: true,
//   imports: [CommonModule, FormsModule]
// })
// export class FollowersListComponent implements OnInit {
//   users: any[] = [];
//   followingIds: number[] = [];
//   currentUserId: number = 0;
//   isLoading: boolean = true;
//   errorMessage: string = '';
//   searchTerm: string = '';

//   constructor(
//     private followersService: FollowersService,
//     private utilisateurService: UtilisateurService
//   ) {}

//   ngOnInit(): void {
//     this.loadUserData(); // Charger les données de l'utilisateur
//   }

//   loadUserData(): void {
//     this.isLoading = true;
//     this.errorMessage = '';
    
//     this.utilisateurService.getMe().subscribe({
//       next: (me) => {
//         this.currentUserId = me.id;
//         this.loadFollowingUsers(); // Charger les utilisateurs suivis
//       },
//       error: (err) => {
//         console.error('Erreur lors de la récupération de l’utilisateur actuel', err);
//         this.handleError(err); // Gérer l'erreur
//       }
//     });
//   }

//   loadFollowingUsers(): void {
//     this.followersService.getFollowing(this.currentUserId).subscribe({
//       next: (response: any) => {
//         try {
//           console.log('Réponse du backend :', response);
          
//           // Gère différents formats de réponse
//           const relations = this.extractRelationsFromResponse(response);
//           this.followingIds = relations.map((r: any) => r.followingId || r.id);
          
//           this.loadAllUsers(); // Charger tous les utilisateurs
//         } catch (error) {
//           this.handleError(error); // Gérer l'erreur
//         }
//       },
//       error: (err) => this.handleError(err)
//     });
//   }

//   loadAllUsers(): void {
//     this.utilisateurService.getAll().subscribe({
//       next: (allUsers: any[]) => {
//         // Filtrer les utilisateurs suivis
//         this.users = allUsers.filter(u => this.followingIds.includes(u.id));
//         this.isLoading = false;
//       },
//       error: (err) => this.handleError(err)
//     });
//   }

//   unfollow(userId: number): void {
//     // Confirmation avant de ne plus suivre
//     if (!confirm('Êtes-vous sûr de vouloir ne plus suivre cet utilisateur ?')) {
//       return;
//     }

//     this.followersService.unfollow(this.currentUserId, userId).subscribe({
//       next: () => {
//         // Mettre à jour les listes après le désabonnement
//         this.followingIds = this.followingIds.filter(id => id !== userId);
//         this.users = this.users.filter(u => u.id !== userId);
//       },
//       error: (err) => {
//         console.error('Erreur lors du désabonnement', err);
//         alert('Impossible de terminer l’action');
//       }
//     });
//   }

//   getRandomColor(): string {
//     // Retourner une couleur aléatoire
//     const colors = [
//       '#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', 
//       '#1abc9c', '#d35400', '#34495e', '#16a085', '#c0392b'
//     ];
//     return colors[Math.floor(Math.random() * colors.length)];
//   }

//   private extractRelationsFromResponse(response: any): any[] {
//     // Extraire les relations depuis différents formats de réponse
//     if (!response) return [];
    
//     if (Array.isArray(response)) return response;
//     if (Array.isArray(response?.data)) return response.data;
//     if (Array.isArray(response?.following)) return response.following;
//     if (Array.isArray(response?.relations)) return response.relations;
    
//     console.warn('Format de réponse non reconnu :', response);
//     return [];
//   }

//   private handleError(error: any): void {
//     // Gérer les erreurs et afficher des messages adaptés
//     console.error('Erreur :', error);
//     this.isLoading = false;
    
//     if (error.status === 401) {
//       this.errorMessage = 'Session expirée - Veuillez vous reconnecter';
//     } else if (error.status === 404) {
//       this.errorMessage = 'Point de terminaison introuvable - Vérifiez la connexion avec le backend';
//     } else if (error.status === 500) {
//       this.errorMessage = 'Erreur du serveur - Veuillez réessayer plus tard';
//     } else {
//       this.errorMessage = 'Erreur lors du chargement des données - Vérifiez votre connexion';
//     }
//   }

//   get filteredUsers() {
//     // Filtrer les utilisateurs selon le terme de recherche
//     if (!this.searchTerm) return this.users;
    
//     return this.users.filter(user => 
//       user.nom?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//       user.pseudo?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//       user.bio?.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );
//   }
// }





























































































































// import { Component, OnInit } from '@angular/core';
// import { FollowersService } from '../services/followers.service';
// import { UtilisateurService } from '../services/utilisateur.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Subject } from 'rxjs';
// import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

// @Component({
//   selector: 'app-followers-list',
//   templateUrl: './followers-list.component.html',
//   styleUrls: ['./followers-list.component.css'],
//   standalone: true,
//   imports: [CommonModule, FormsModule]
// })
// export class FollowersListComponent implements OnInit {
//   users: any[] = [];
//   followingIds: number[] = [];
//   currentUserId: number = 0;
//   isLoading: boolean = true;
//   errorMessage: string = '';
//   searchTerm: string = '';
//   searchResults: any[] = [];
//   isSearching: boolean = false;
//   private searchTerms = new Subject<string>();

//   constructor(
//     private followersService: FollowersService,
//     private utilisateurService: UtilisateurService
//   ) {}

//   ngOnInit(): void {
//     this.loadUserData();
//     this.setupSearch();
//   }

//   private setupSearch(): void {
//     this.searchTerms.pipe(
//       debounceTime(300),
//       distinctUntilChanged(),
//       switchMap(term => {
//         this.isSearching = true;
//         if (!term || term.length < 2) {
//           this.searchResults = [];
//           return [];
//         }
//         return this.utilisateurService.searchUsers(term);
//       })
//     ).subscribe({
//       next: (results) => {
//         this.searchResults = results || [];
//         this.isSearching = false;
//       },
//       error: (err) => {
//         console.error('Erreur de recherche :', err);
//         this.isSearching = false;
//       }
//     });
//   }

//   search(term: string): void {
//     this.searchTerms.next(term);
//   }

//   loadUserData(): void {
//     this.isLoading = true;
//     this.errorMessage = '';
    
//     this.utilisateurService.getMe().subscribe({
//       next: (me) => {
//         this.currentUserId = me.id;
//         this.loadFollowingUsers();
//       },
//       error: (err) => {
//         console.error("Erreur lors de la récupération de l'utilisateur actuel :", err);
//         this.handleError(err);
//       }
//     });
//   }

//   loadFollowingUsers(): void {
//     this.followersService.getFollowing(this.currentUserId).subscribe({
//       next: (response) => {
//         try {
//           const relations = this.extractRelationsFromResponse(response);
//           this.followingIds = relations.map((r: any) => r.followingId || r.id);
//           this.loadAllUsers();
//         } catch (error) {
//           this.handleError(error);
//         }
//       },
//       error: (err) => this.handleError(err)
//     });
//   }

//   loadAllUsers(): void {
//     this.utilisateurService.getAll().subscribe({
//       next: (allUsers) => {
//         this.users = allUsers.filter(u => this.followingIds.includes(u.id));
//         this.isLoading = false;
//       },
//       error: (err) => this.handleError(err)
//     });
//   }

//   follow(userId: number): void {
//     this.followersService.follow(this.currentUserId, userId).subscribe({
//       next: () => {
//         if (!this.followingIds.includes(userId)) {
//           this.followingIds.push(userId);
//           this.loadAllUsers();
//         }
//       },
//       error: (err) => {
//         console.error("Erreur lors du suivi de l'utilisateur :", err);
//         alert(err?.error?.message || "L'action n'a pas pu être complétée");
//       }
//     });
//   }

//   unfollow(userId: number): void {
//     if (!confirm("Êtes-vous sûr de vouloir ne plus suivre cet utilisateur ?")) return;

//     this.followersService.unfollow(this.currentUserId, userId).subscribe({
//       next: () => {
//         this.followingIds = this.followingIds.filter(id => id !== userId);
//         this.users = this.users.filter(u => u.id !== userId);
//         this.searchResults = this.searchResults.map(u => ({
//           ...u,
//           isFollowed: this.followingIds.includes(u.id)
//         }));
//       },
//       error: (err) => {
//         console.error("Erreur lors de l'arrêt du suivi de l'utilisateur :", err);
//         alert("L'action n'a pas pu être complétée");
//       }
//     });
//   }

//   private extractRelationsFromResponse(response: any): any[] {
//     if (!response) return [];
//     if (Array.isArray(response)) return response;
//     if (Array.isArray(response?.data)) return response.data;
//     if (Array.isArray(response?.following)) return response.following;
//     if (Array.isArray(response?.relations)) return response.relations;
//     console.warn("Format de réponse non reconnu :", response);
//     return [];
//   }

//   private handleError(error: any): void {
//     console.error("Erreur :", error);
//     this.isLoading = false;
    
//     if (error.status === 401) {
//       this.errorMessage = "Session expirée - Veuillez vous reconnecter";
//     } else if (error.status === 404) {
//       this.errorMessage = "Ressource non trouvée";
//     } else if (error.status === 500) {
//       this.errorMessage = "Erreur du serveur - Veuillez réessayer plus tard";
//     } else {
//       this.errorMessage = "Erreur de chargement des données - Vérifiez votre connexion";
//     }
//   }

//   getRandomColor(): string {
//     const colors = [
//       '#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6',
//       '#1abc9c', '#d35400', '#34495e', '#16a085', '#c0392b'
//     ];
//     return colors[Math.floor(Math.random() * colors.length)];
//   }

//   get filteredUsers() {
//     if (!this.searchTerm) return this.users;
    
//     return this.users.filter(user => 
//       user.nom?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//       user.pseudo?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//       user.bio?.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );
//   }
// }


























import { Component, OnInit } from '@angular/core';
import { FollowersService } from '../services/followers.service';
import { UtilisateurService } from '../services/utilisateur.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-followers-list',
  templateUrl: './followers-list.component.html',
  styleUrls: ['./followers-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class FollowersListComponent implements OnInit {
  users: any[] = [];
  followers: any[] = []; // Usuarios que me siguen
  following: any[] = []; // Usuarios que yo sigo
  followingIds: number[] = [];
  currentUserId: number = 0;
  isLoading: boolean = true;
  errorMessage: string = '';
  searchTerm: string = '';
  searchResults: any[] = [];
  isSearching: boolean = false;
  activeTab: 'following' | 'followers' = 'following'; // Pestaña activa
  private searchTerms = new Subject<string>();

  constructor(
    private followersService: FollowersService,
    private utilisateurService: UtilisateurService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        this.isSearching = true;
        if (!term || term.length < 2) {
          this.searchResults = [];
          return [];
        }
        return this.utilisateurService.searchUsers(term);
      })
    ).subscribe({
      next: (results) => {
        this.searchResults = results || [];
        this.isSearching = false;
      },
      error: (err) => {
        console.error('Erreur de recherche :', err);
        this.isSearching = false;
      }
    });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  loadUserData(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.utilisateurService.getMe().subscribe({
      next: (me) => {
        this.currentUserId = me.id;
        this.loadFollowingUsers();
        this.loadFollowers(); 
      },
      error: (err) => {
        console.error("Erreur lors de la récupération de l'utilisateur actuel :", err);
        this.handleError(err);
      }
    });
  }

  loadFollowingUsers(): void {
    this.followersService.getFollowing(this.currentUserId).subscribe({
      next: (response) => {
        try {
          const relations = this.extractRelationsFromResponse(response);
          this.followingIds = relations.map((r: any) => r.followingId || r.id);
          
        
          this.utilisateurService.getAll().subscribe({
            next: (allUsers) => {
              this.following = allUsers.filter(u => this.followingIds.includes(u.id));
              this.isLoading = false;
            },
            error: (err) => this.handleError(err)
          });
        } catch (error) {
          this.handleError(error);
        }
      },
      error: (err) => this.handleError(err)
    });
  }

  loadFollowers(): void {
    this.followersService.getFollowers(this.currentUserId).subscribe({
      next: (response) => {
        try {
          const relations = this.extractRelationsFromResponse(response);
          const followerIds = relations.map((r: any) => r.followerId || r.id);
          
          // Cargar información completa de los seguidores
          this.utilisateurService.getAll().subscribe({
            next: (allUsers) => {
              this.followers = allUsers.filter(u => followerIds.includes(u.id));
              this.isLoading = false;
            },
            error: (err) => this.handleError(err)
          });
        } catch (error) {
          this.handleError(error);
        }
      },
      error: (err) => this.handleError(err)
    });
  }

  follow(userId: number): void {
    this.followersService.follow(this.currentUserId, userId).subscribe({
      next: () => {
        if (!this.followingIds.includes(userId)) {
          this.followingIds.push(userId);
        
          this.loadFollowingUsers();
        }
      },
      error: (err) => {
        console.error("Erreur lors du suivi de l'utilisateur :", err);
        alert(err?.error?.message || "L'action n'a pas pu être complétée");
      }
    });
  }

  unfollow(userId: number): void {
    if (!confirm("Êtes-vous sûr de vouloir ne plus suivre cet utilisateur ?")) return;

    this.followersService.unfollow(this.currentUserId, userId).subscribe({
      next: () => {
        this.followingIds = this.followingIds.filter(id => id !== userId);
        this.following = this.following.filter(u => u.id !== userId);
        this.searchResults = this.searchResults.map(u => ({
          ...u,
          isFollowed: this.followingIds.includes(u.id)
        }));
      },
      error: (err) => {
        console.error("Erreur lors de l'arrêt du suivi de l'utilisateur :", err);
        alert("L'action n'a pas pu être complétée");
      }
    });
  }

  // Cambiar entre pestañas
  setActiveTab(tab: 'following' | 'followers'): void {
    this.activeTab = tab;
  }

  private extractRelationsFromResponse(response: any): any[] {
    if (!response) return [];
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.following)) return response.following;
    if (Array.isArray(response?.followers)) return response.followers;
    if (Array.isArray(response?.relations)) return response.relations;
    console.warn("Format de réponse non reconnu :", response);
    return [];
  }

  private handleError(error: any): void {
    console.error("Erreur :", error);
    this.isLoading = false;
    
    if (error.status === 401) {
      this.errorMessage = "Session expirée - Veuillez vous reconnecter";
    } else if (error.status === 404) {
      this.errorMessage = "Ressource non trouvée";
    } else if (error.status === 500) {
      this.errorMessage = "Erreur du serveur - Veuillez réessayer plus tard";
    } else {
      this.errorMessage = "Erreur de chargement des données - Vérifiez votre connexion";
    }
  }

  getRandomColor(): string {
    const colors = [
      '#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6',
      '#1abc9c', '#d35400', '#34495e', '#16a085', '#c0392b'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}






    //  '#34495e', '#34495e', '#34495e', '#34495e', '#34495e',
    //   '#34495e', '#34495e', '#34495e', '#34495e', '#34495e'