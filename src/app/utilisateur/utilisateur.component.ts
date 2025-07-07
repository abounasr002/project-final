// import { Component, NgModule, OnInit } from '@angular/core';
// import { UtilisateurService } from '../services/utilisateur.service';
// import { Utilisateur } from '../models/utilisateur.model';
// import { FormsModule, NgModel } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-utilisateur',
//   templateUrl: './utilisateur.component.html',
//   imports:[FormsModule, CommonModule]
// })
// export class UtilisateurComponent implements OnInit {
//   utilisateurs: Utilisateur[] = [];

//   constructor(private utilisateurService: UtilisateurService) {}

//   ngOnInit(): void {
//     this.utilisateurService.getAll().subscribe(data => {
//       this.utilisateurs = data;
//     });
//   }
// }




















import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service'; 
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css'],
  imports: [FormsModule, CommonModule, ReactiveFormsModule ,
    RouterModule,] 
})
export class UtilisateursComponent implements OnInit {
navigateToUtilisateurs() {
throw new Error('Method not implemented.');
}

  utilisateurs: any[] = [];
  utilisateurForm: FormGroup;
  isEditMode = false;
  currentUserId: number | null = null;

  constructor(
    private utilisateurService: UtilisateurService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.utilisateurForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['user', Validators.required],
      bio: ['']
    });
  }

  ngOnInit(): void {
    // Fetch users list on component load
    this.fetchUtilisateurs();

    // Check if we're editing an existing utilisateur
    const utilisateurId = this.route.snapshot.paramMap.get('id');
    if (utilisateurId) {
      this.isEditMode = true;
      this.currentUserId = +utilisateurId;
      this.loadUtilisateurForEdit(this.currentUserId);
    }
  }

  // Fetch all users
  fetchUtilisateurs(): void {
    this.utilisateurService.getAll().subscribe(users => {
      this.utilisateurs = users;
    });
  }

  // Load user for edit
  loadUtilisateurForEdit(id: number): void {
    this.utilisateurService.getById(id).subscribe(user => {
      this.utilisateurForm.patchValue(user);
    });
  }

  // Handle form submission (Create or Update)
  onSubmit(): void {
    if (this.utilisateurForm.valid) {
      const formData = this.utilisateurForm.value;
      if (this.isEditMode && this.currentUserId) {
        this.utilisateurService.update(this.currentUserId, formData).subscribe(() => {
          this.router.navigate(['/utilisateurs']);
        });
      } else {
        this.utilisateurService.create(formData).subscribe(() => {
          this.router.navigate(['/utilisateurs']);
        });
      }
    }
  }

  // Delete utilisateur
  deleteUtilisateur(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.utilisateurService.delete(id).subscribe(() => {
        this.utilisateurs = this.utilisateurs.filter(u => u.id !== id);
      });
    }
  }
}

