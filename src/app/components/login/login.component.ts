// import { Component } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   imports: [FormsModule]
// })
// export class LoginComponent {
//   email: string = '';
//   password: string = '';

//   constructor(private authService: AuthService) {}

//   login() {
//     this.authService.login({ email: this.email, password: this.password }).subscribe({
//       next: (response) => {
//         console.log('Connexion réussie:', response);
//       },
//       error: (error) => {
//         console.error('Error de login:', error);
//       }
//     });
//   }
// }




















// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   imports: [FormsModule, CommonModule]
// })
// export class LoginComponent implements OnInit {
//   email: string = '';
//   password: string = '';
//   isAuthenticated: boolean = false;  // Variable pour gérer l'état de l'authentification

//   constructor(private authService: AuthService) {}

//   ngOnInit() {
//     // Lors du chargement du composant, nous vérifions si l'utilisateur est authentifié
//     this.authService.getCurrentUser().subscribe({
//       next: (user) => {
//         this.isAuthenticated = true;  // Si la réponse est valide, l'utilisateur est authentifié
//       },
//       error: () => {
//         this.isAuthenticated = false;  // En cas d'erreur, l'utilisateur n'est pas authentifié
//       }
//     });
//   }

//   login() {
//     this.authService.login({ email: this.email, password: this.password }).subscribe({
//       next: (response) => {
//         console.log('Connexion réussie:', response);
//         this.isAuthenticated = true;  // Nous changeons l'état à "connecté"
//       },
//       error: (error) => {
//         console.error('Erreur de connexion:', error);
//         this.isAuthenticated = false;  // En cas d'erreur lors de la connexion, nous gardons l'utilisateur déconnecté
//       }
//     });
//   }

//   logout() {
//     this.authService.logout().subscribe({
//       next: () => {
//         console.log('Déconnexion réussie');
//         this.isAuthenticated = false;  // Nous mettons à jour l'état
//       },
//       error: (error) => {
//         console.error('Erreur de déconnexion:', error);
//       }
//     });
//   }
// }















// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   imports: [FormsModule, CommonModule]
// })
// export class LoginComponent implements OnInit {
//   email: string = '';
//   password: string = '';
//   isAuthenticated: boolean = false;  // Variable pour gérer l'état de l'authentification
//   errorMessage: string = '';  // Variable pour stocker le message d'erreur

//   constructor(private authService: AuthService) {}

//   ngOnInit() {
//     // Lors du chargement du composant, nous vérifions si l'utilisateur est authentifié
//     this.authService.getCurrentUser().subscribe({
//       next: (user) => {
//         this.isAuthenticated = true;  // Si la réponse est valide, l'utilisateur est authentifié
//       },
//       error: () => {
//         this.isAuthenticated = false;  // En cas d'erreur, l'utilisateur n'est pas authentifié
//       }
//     });
//   }

//   login() {
//     this.authService.login({ email: this.email, password: this.password }).subscribe({
//       next: (response) => {
//         console.log('Connexion réussie:', response);
//         this.isAuthenticated = true;  // Nous changeons l'état à "connecté"
//         this.errorMessage = '';  
//       },
//       error: (error) => {
//         console.error('Erreur de connexion:', error);
//         this.isAuthenticated = false;  // En cas d'erreur de connexion, nous maintenons l'utilisateur déconnecté
//         this.errorMessage = 'Une erreur est survenue lors de la connexion. Veuillez réessayer.';  
//       }
//     });
//   }

//   logout() {
//     this.authService.logout().subscribe({
//       next: () => {
//         console.log('Déconnexion réussie');
//         this.isAuthenticated = false;  // Nous mettons à jour l'état
//         this.errorMessage = '';  
//       },
//       error: (error) => {
//         console.error('Erreur de déconnexion:', error);
//         this.errorMessage = 'Une erreur est survenue lors de la déconnexion. Veuillez réessayer.';
//       }
//     });
//   }
// }








import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Adjusted to the correct path

@Component({
  selector: 'app-login',
  standalone: true, // Si vous utilisez des composants standalone
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  isAuthenticated: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // Initialisation du formulaire réactif
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Vérifier si l'utilisateur est déjà authentifié lors du chargement du composant
    this.authService.getCurrentUser().subscribe({
      next: (user: any) => {
        this.isAuthenticated = true;
      },
      error: () => {
        this.isAuthenticated = false;
      },
    });
  }

  // login() {
  //   if (this.loginForm.valid) {
  //     this.authService.login(this.loginForm.value).subscribe({
  //       next: (response: any) => {
  //         console.log('Connexion réussie:', response);
  //         this.isAuthenticated = true;
  //         this.errorMessage = '';
  //         this.router.navigate(['./accuil']);
  //       },
  //       error: (error: { error: { message: string; }; }) => {
  //         console.error('Erreur de connexion:', error);
  //         this.isAuthenticated = false;
  //         if (error.error && error.error.message) {
  //           this.errorMessage = error.error.message;
  //         } else {
  //           this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
  //         }
  //       },
  //     });
  //   }
  // }


  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          console.log('Connexion réussie:', response);
          // Stockage du token
          localStorage.setItem('token', response.token);
          this.isAuthenticated = true;
          this.errorMessage = '';
          // Redirection vers la page d'accueil
          this.router.navigate(['/accueil']);
        },
        error: (error: { error: { message: string } }) => {
          console.error('Erreur de connexion:', error);
          this.isAuthenticated = false;
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
          }
        },
      });
    }
  }
  

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Déconnexion réussie');
        this.isAuthenticated = false;
        this.errorMessage = '';
      },
      error: (error: any) => {
        console.error('Erreur lors de la déconnexion:', error);
        this.errorMessage = 'Une erreur est survenue lors de la déconnexion. Veuillez réessayer.';
      },
    });
  }

  goToRegister() {
    console.log("Navigation vers la page d'inscription");
    this.router.navigate(['register']);
  }
}

