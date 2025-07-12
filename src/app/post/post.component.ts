import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';
import { LikeService } from '../services/like.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from '../models/utilisateur.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PostWithUser } from '../models/Post';
import { CommentWithUser } from '../models/comment.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PostComponent implements OnInit {
  posts: PostWithUser[] = [];
  showComments: { [postId: number]: boolean } = {};
  pseudo: Utilisateur[] = [];
  nouveauPost = { content: '', media: '', link: '' };
  commm: CommentWithUser[] = [];
  newComment: { [postId: number]: string } = {};
  showCommentForm: { [postId: number]: boolean } = {};
  showForm = false;

  currentUserId = 0;
  currentUserAvatar: string = 'assets/default-avatar.png';
  likedPosts: { [postId: number]: boolean } = {};
  utilisateur: Utilisateur | null = null;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private likeService: LikeService,
    private utilisateurService: UtilisateurService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.utilisateurService.getMe().subscribe(utilisateur => {
      this.utilisateur = utilisateur;
      this.currentUserId = utilisateur?.id ?? 0;
      this.currentUserAvatar = utilisateur?.profilePicture || 'assets/default-avatar.png';
      this.loadPostsAndUsers();
    });
  }

  loadPostsAndUsers(): void {
    forkJoin({
      postJoin: this.postService.getPosts(),
      usersJoin: this.utilisateurService.getAll()
    }).subscribe(({ postJoin, usersJoin }) => {
      this.pseudo = usersJoin;
      this.posts = postJoin.map(p => {
        const auteur = this.pseudo.find(u => u.id === p.userId);
        const postWithUser: PostWithUser = {
          ...p,
          utilisateur: auteur ?? {
            id: -1,
            nom: 'Inconnu',
            pseudo: 'inconnu',
            email: '',
            password: '',
            bio: '',
            profilePicture: '',
            socialLinks: {},
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          likes: 0
        };

        if (postWithUser.id != null) {
          this.loadLikes(postWithUser.id);
        }
        return postWithUser;
      });
    });
  }

  loadCommentsForPost(postId: number): void {
    forkJoin({
      commentJoin: this.commentService.getCommentsByPost(postId),
      usersJoin: this.utilisateurService.getAll()
    }).subscribe(({ commentJoin, usersJoin }) => {
      this.commm = commentJoin.map(c => {
        const user = usersJoin.find(u => u.id === c.userId);
        return {
          ...c,
          utilisateur: user ?? {
            nom: 'Inconnu',
            pseudo: 'inconnu',
            profilePicture: 'assets/default-avatar.png'
          }
        } as CommentWithUser;
      });
      this.showComments[postId] = true;
    });
  }

  loadLikes(postId: number): void {
    this.likeService.getLikesByPost(postId).subscribe({
      next: (likes) => {
        this.likedPosts[postId] = likes.some(like => like.userId === this.currentUserId);
        const post = this.posts.find(p => p.id === postId);
        if (post) {
          post.likes = likes.length;
        }
      },
      error: err => {
        console.error('Error loading likes:', err);
      }
    });
  }

  likePost(postId: number): void {
    if (this.likedPosts[postId]) {
      this.likeService.removeLike(this.currentUserId, postId).subscribe({
        next: () => {
          this.likedPosts[postId] = false;
          this.loadLikes(postId);
        },
        error: err => console.error('Error removing like:', err)
      });
    } else {
      this.likeService.addLike(this.currentUserId, postId).subscribe({
        next: () => {
          this.likedPosts[postId] = true;
          this.loadLikes(postId);
        },
        error: err => console.error('Error adding like:', err)
      });
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  createPost() {
    this.postService.createPost(this.nouveauPost).subscribe({
      next: () => {
        this.nouveauPost = { content: '', media: '', link: '' };
        window.location.reload(); // puedes optimizar esto más adelante
      },
      error: () => {
        alert("Le titre et la description du post sont requis.");
      }
    });
  }

  toggleCommentForm(postId: number): void {
    this.showCommentForm[postId] = !this.showCommentForm[postId];
    if (this.showCommentForm[postId]) {
      this.newComment[postId] = '';
    }
  }

  toggleComments(postId: number): void {
    if (this.showComments[postId]) {
      this.showComments[postId] = false;
    } else {
      this.loadCommentsForPost(postId);
    }
  }

  addComment(postId: number): void {
    const content = this.newComment[postId]?.trim();
    if (!content) return;

    this.commentService.createComment(postId, { content }).subscribe({
      next: () => {
        this.loadCommentsForPost(postId);
        this.newComment[postId] = '';
      },
      error: err => console.error('Erreur lors de l\'ajout du commentaire :', err)
    });
  }

  cancelComment(postId: number): void {
    this.newComment[postId] = '';
    this.showCommentForm[postId] = false;
  }

  deletePost(postId: number): void {
    if (!confirm('Delete this post?')) return;
    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.posts = this.posts.filter(p => p.id !== postId);
      },
      error: err => console.error('Error deleting post:', err)
    });
  }

  isImage(url: string) {
    return /\.(jpe?g|png|gif|webp)$/i.test(url);
  }

  isVideo(url: string) {
    return /\.(mp4|webm|ogg)$/i.test(url);
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      },
      error: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      }
    });
  }

  goToPosts() {
    this.router.navigate(['/post']);
  }
}
