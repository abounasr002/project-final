// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-accueil',
//   standalone: true,
//   templateUrl: './accueil.component.html',
//   styleUrls: ['./accueil.component.css'],
//   imports: [FormsModule, CommonModule]
// })
// export class AccueilComponent {
//   showForm = false;
//   nouveauPost = { content: '', media: '', link: '' };
//   posts: any[] = []; // Aquí deberías cargar tus posts reales

//   constructor(
//     private router: Router,
//     private authService: AuthService
//   ) {}

//   // Redirige a /posts
//   goToPosts() {
//     this.router.navigate(['/post']);
//   }

//   toggleForm() {
//     this.showForm = !this.showForm;
//   }

//   createPost() {
//     // Lógica para crear un post
//     console.log('Nuevo post:', this.nouveauPost);
//     // Limpiar el formulario después de crear
//     this.nouveauPost = { content: '', media: '', link: '' };
//     this.showForm = false;
//   }

//   supprimerPost(id: string) {
//     // Lógica para eliminar un post
//     console.log('Eliminar post con id:', id);
//   }

//   logout() {
//     this.authService.logout().subscribe({
//       next: () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         this.router.navigate(['/login']);
//       },
//       error: (err) => {
//         console.error('Error durante el logout:', err);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         this.router.navigate(['/login']);
//       }
//     });
//   }
// }















// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-accueil',
//   standalone: true,
//   templateUrl: './accueil.component.html',
//   styleUrls: ['./accueil.component.css'],
//   imports: [FormsModule, CommonModule]
// })
// export class AccueilComponent {
//   showForm = false;
//   nouveauPost = { content: '', media: '', link: '' };
//   posts: any[] = []; // Lista de posts (deberías cargarlos desde un servicio)

//   constructor(
//     private router: Router,
//     private authService: AuthService
//   ) {}

//   // Método para redirigir a posts
//   goToPosts() {
//     this.router.navigate(['/posts']);
//   }

//   // Mostrar/ocultar formulario de creación
//   toggleForm() {
//     this.showForm = !this.showForm;
//   }

//   // Crear un nuevo post
//   createPost() {
//     console.log('Nouveau post:', this.nouveauPost);
//     // Aquí deberías llamar a tu servicio para crear el post
//     this.nouveauPost = { content: '', media: '', link: '' };
//     this.showForm = false;
//   }

//   // Eliminar un post
//   supprimerPost(id: string) {
//     console.log('Supprimer post avec id:', id);
//     // Lógica para eliminar el post
//   }

//   // Cerrar sesión
//   logout() {
//     this.authService.logout().subscribe({
//       next: () => {
//         this.clearSession();
//         this.redirectToLogin();
//       },
//       error: (err) => {
//         console.error('Erreur lors de la déconnexion:', err);
//         this.clearSession();
//         this.redirectToLogin();
//       }
//     });
//   }

//   // Limpiar datos de sesión
//   private clearSession() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     // Agrega aquí otros datos de sesión si es necesario
//   }

//   // Redirigir a login
//   private redirectToLogin() {
//     this.router.navigate(['/login']);
//   }
// }




















import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from '../models/utilisateur.model';

@Component({
  selector: 'app-accueil',
  standalone: true,
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  imports: [FormsModule, CommonModule, RouterModule]
})
export class AccueilComponent {
  showForm = false;
  nouveauPost = { content: '', media: '', link: '' };
  posts: any[] = [];
  utilisateur: Utilisateur | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private utilisaterService: UtilisateurService
  ) {}

  ngOnInit() {
    this.utilisaterService.getMe().subscribe(utilisateur => {
       this.utilisateur = utilisateur
       console.log("Utilisateur co:", utilisateur)
    })
  }

  // Método para redirigir a posts
  goToPosts() {
    this.router.navigate(['/post']);
  }

  // Verificar si la ruta está activa
  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  // ... (otros métodos existentes: toggleForm, createPost, supprimerPost)

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.clearSession();
        this.redirectToLogin();
      },
      error: (err) => {
        console.error('Erreur lors de la déconnexion:', err);
        this.clearSession();
        this.redirectToLogin();
      }
    });
  }

  private clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  private redirectToLogin() {
    this.router.navigate(['/login']);
  }
}