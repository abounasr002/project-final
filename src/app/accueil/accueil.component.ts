
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from '../models/utilisateur.model';
import { PostWithUser } from '../models/Post';
import { forkJoin } from 'rxjs';
import { CommentWithUser } from '../models/comment.model';
import { CommentService } from '../services/comment.service';
import { LikeService } from '../services/like.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  imports: [FormsModule, CommonModule, RouterModule]
})
export class AccueilComponent {
isActive(arg0: string) {
throw new Error('Method not implemented.');
}

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
  if (!this.utilisateur?.id) {
    console.warn("Utilisateur non disponible pour charger les posts.");
    return;
  }

  const userIdStr = this.utilisateur.id.toString();

  forkJoin({
    postJoin: this.postService.getPostsByUserId(userIdStr),
    usersJoin: this.utilisateurService.getAll()
  }).subscribe({
    next: ({ postJoin, usersJoin }) => {
      this.pseudo = usersJoin;

      this.posts = postJoin.map(post => {
        const auteur = this.pseudo.find(u => u.id === post.userId);
        const postWithUser: PostWithUser = {
          ...post,
          utilisateur: auteur ?? this.getDefaultUtilisateur(),
          likes: 0
        };

        if (postWithUser.id != null) {
          this.loadLikes(postWithUser.id);
        }

        return postWithUser;
      });
    },
    error: (err) => {
      console.error("Erreur lors du chargement des posts par utilisateur:", err);
    }
  });
}

private getDefaultUtilisateur(): Utilisateur {
  return {
    id: -1,
    nom: 'Inconnu',
    pseudo: 'inconnu',
    email: '',
    password: '',
    bio: '',
    profilePicture: 'assets/default-avatar.png',
    socialLinks: {},
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
    avatarUrl: '',
    followersCount: 0,
    followingCount: 0,
    prenom: '',
    isVerified: false
  };
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



   goToFollowers() {
    this.router.navigate(['/followers']);
  }

  goToAccueil() {
    this.router.navigate(['/accueil']);
  }

  
}





























  // showForm = false;
  // nouveauPost = { content: '', media: '', link: '' };
  // posts: any[] = [];
  // utilisateur: Utilisateur | null = null;

  // constructor(
  //   private router: Router,
  //   private authService: AuthService,
  //   private utilisaterService: UtilisateurService
  // ) {}

  // ngOnInit() {
  //   this.utilisaterService.getMe().subscribe(utilisateur => {
  //      this.utilisateur = utilisateur
  //      console.log("Utilisateur co:", utilisateur)
  //   })
  // }

  // // Método para redirigir a posts
  // goToPosts() {
  //   this.router.navigate(['/post']);
  // }

  // // Verificar si la ruta está activa
  // isActive(route: string): boolean {
  //   return this.router.isActive(route, true);
  // }

  // // ... (otros métodos existentes: toggleForm, createPost, supprimerPost)

  // logout() {
  //   this.authService.logout().subscribe({
  //     next: () => {
  //       this.clearSession();
  //       this.redirectToLogin();
  //     },
  //     error: (err) => {
  //       console.error('Erreur lors de la déconnexion:', err);
  //       this.clearSession();
  //       this.redirectToLogin();
  //     }
  //   });
  // }

  // private clearSession() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  // }

  // private redirectToLogin() {
  //   this.router.navigate(['/login']);
  // }
