import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../services/utilisateur.service';
import { FormsModule } from '@angular/forms';
import { Utilisateur } from '../models/utilisateur.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  imports: [FormsModule, CommonModule],
})
export class ProfilComponent {
getRandomColor() {
throw new Error('Method not implemented.');
}
  utilisateur: Utilisateur | null = null;
  bio: string = '';
  nom: string = '';

  constructor(private utilisaterService: UtilisateurService) {}

  ngOnInit() {
    this.utilisaterService.getMe().subscribe(utilisateur => {
       this.utilisateur = utilisateur;
       console.log("Utilisateur co:", utilisateur)
    })
  }

  updateProfil() {
  if (!this.utilisateur) return;

  const modify = {
    nom: this.utilisateur.pseudo,
    bio: this.bio
  };

  this.utilisaterService.updateUser(this.utilisateur.id, modify).subscribe({
    next: response => {
      console.log("Profil mis à jour:", response);
    },
    error: err => console.error(err)
  });


  
}



}
