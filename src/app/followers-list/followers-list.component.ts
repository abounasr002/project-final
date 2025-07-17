
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