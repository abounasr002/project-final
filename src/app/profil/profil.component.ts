import { Component, OnInit } from '@angular/core';
import { Profil, ProfilService } from '../services/profil.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  imports: [FormsModule],
})
export class ProfilComponent implements OnInit {
  profil: Profil = {
    bio: '',
    pseudo: '',
    avatarUrl: '',
  };
  userId: number = 1; // Puedes actualizar esto dinámicamente según el usuario conectado

  constructor(private profilService: ProfilService) {}

  ngOnInit() {
    this.loadProfil();
  }

  loadProfil() {
    this.profilService.getProfilById(this.userId).subscribe({
      next: (data) => (this.profil = data),
      error: () => console.log('Profil non trouvé'),
    });
  }

  createProfil() {
    this.profilService.createProfil({ ...this.profil, id: this.userId }).subscribe({
      next: () => {
        alert('Profil créé avec succès');
        this.loadProfil();
      },
      error: (err) => alert(err.error.message),
    });
  }

  updateProfil() {
    this.profilService.updateProfil(this.userId, this.profil).subscribe({
      next: () => alert('Profil mis à jour avec succès'),
      error: (err) => alert(err.error.message),
    });
  }

  deleteProfil() {
    this.profilService.deleteProfil(this.userId).subscribe({
      next: () => {
        alert('Profil supprimé avec succès');
        this.profil = { bio: '', pseudo: '', avatarUrl: '' };
      },
      error: (err) => alert(err.error.message),
    });
  }
}
