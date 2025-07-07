import { Component, OnInit } from '@angular/core';
import { FollowersService, Follower } from '../services/followers.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css'],
  imports: [FormsModule, CommonModule,]
})
export class FollowersComponent implements OnInit {
  userId = 1; // ID del usuario actual (puedes cambiarlo dinámicamente)
  followers: Follower[] = [];
  following: Follower[] = [];
  message = '';

  constructor(private followersService: FollowersService) {}

  ngOnInit(): void {
    this.loadFollowers();
    this.loadFollowing();
  }

  loadFollowers() {
    this.followersService.getFollowers(this.userId).subscribe({
      next: res => this.followers = res.followers,
      error: err => this.message = 'Error cargando seguidores.'
    });
  }

  loadFollowing() {
    this.followersService.getFollowing(this.userId).subscribe({
      next: res => this.following = res.following,
      error: err => this.message = 'Error cargando usuarios seguidos.'
    });
  }

  followUser(followingId: number) {
    this.followersService.followUser(this.userId, followingId).subscribe({
      next: res => {
        this.message = res.message;
        this.loadFollowing();
      },
      error: err => this.message = err.error.message || 'Error al seguir usuario.'
    });
  }

  unfollowUser(followingId: number) {
    this.followersService.unfollowUser(this.userId, followingId).subscribe({
      next: res => {
        this.message = res.message;
        this.loadFollowing();
      },
      error: err => this.message = err.error.message || 'Error al dejar de seguir usuario.'
    });
  }
}
