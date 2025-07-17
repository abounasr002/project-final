


import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Ajusta el path según tu proyecto
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports:[FormsModule,CommonModule]
})
export class RegisterComponent {
  nom: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';  
  successMessage: string = ''; 

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register({ nom: this.nom, email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Inscription réussie:', response);
        // Attribuer le message de succès
        this.successMessage = 'Inscription réussie';
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Erreur d\'enregistrement:', error);
      
        this.successMessage = '';
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.';
        }
      }
    });
  }
}
