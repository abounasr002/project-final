// // src/app/post/post.component.ts

// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// interface Post {
//   id?: number;
//   userId: number;
//   content: string;
//   media?: string;
//   link?: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// @Component({
//   selector: 'app-post',
//   templateUrl: './post.component.html',
//   styleUrls: ['./post.component.css'],
//   imports:[FormsModule, CommonModule]
// })
// export class PostComponent implements OnInit {
// isImage(arg0: string): any {
// throw new Error('Method not implemented.');
// }
// isVideo(arg0: string): any {
// throw new Error('Method not implemented.');
// }
//   posts: Post[] = [];
//   nouveauPost: Post = {
//     userId: 1, // Cambiar si usas autenticación real
//     content: '',
//     media: '',
//     link: ''
//   };
//   showForm = false;

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.chargerPosts();
//   }

//   chargerPosts(): void {
//     this.http.get<Post[]>('http://localhost:3000/posts')
//       .subscribe((data) => this.posts = data);
//   }

//   toggleForm(): void {
//     this.showForm = !this.showForm;
//   }

//   createPost(): void {
//     this.http.post<Post>('http://localhost:3000/posts', this.nouveauPost)
//       .subscribe(() => {
//         this.chargerPosts();
//         this.nouveauPost = { userId: 1, content: '', media: '', link: '' };
//         this.showForm = false;
//       });
//   }

//   supprimerPost(id: number): void {
//     this.http.delete(`http://localhost:3000/posts/${id}`)
//       .subscribe(() => this.chargerPosts());
//   }
// }













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
import { Post, PostWithUser } from '../models/Post';
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

  pseudo: Utilisateur[] = []
  post: Post [] = []
  nouveauPost: { content: string, media: string, link: string } = { content: '', media: '', link: '' };
  comments: { [postId: number]: { content: string, createdAt: string, pseudo: string, avatar: string }[] } = {};
  commm: CommentWithUser [] = []


  newComment: { [postId: number]: string } = {};
  showCommentForm: { [postId: number]: boolean } = {}; showForm = false;
  currentUserId = 1; // Simulado
  likedPosts: { [postId: number]: boolean } = {};
currentUserAvatar: any;


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
      console.log("Utilisateur co:", utilisateur);
    });

    forkJoin({
      postJoin: this.postService.getPosts(),
      usersJoin: this.utilisateurService.getAll()
    }).subscribe(({ postJoin, usersJoin }) => {
      this.posts = postJoin;
      this.pseudo = usersJoin;
      // Filtrer les posts
      this.posts = this.posts.map(p => {
        const auteur = this.pseudo.find(u => u.id === p.userId);
        return {
          ...p,
          utilisateur: auteur ? auteur : {
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
          }
        };
      });
    });
    
    
  }


  loadCommentsForPost(postId: number): void {
    forkJoin({
      commentJoin: this.commentService.getCommentsByPost(postId),
      usersJoin: this.utilisateurService.getAll()
    }).subscribe(({ commentJoin, usersJoin }) => {
      this.commm = commentJoin.map((c: any) => {
        const user = usersJoin.find(u => u.id === c.userId)
        return {
          ...c,
          utilisateur: user || {
            nom: 'Inconnu',
            pseudo: 'inconnu',
            profilePicture: 'assets/default-avatar.png'
          }
        } as CommentWithUser;
      });
      console.log("Commentaires enrichis :", this.commm);

  
      this.showComments[postId] = true;
    });
  }

  


  

  goToPosts() {
    this.router.navigate(['/post']);
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

  // loadPosts(): void {
  //   this.postService.getPosts().subscribe({
  //     next: posts => {
  //       this.posts = posts;
  //       posts.forEach(post => {
  //       this.commentService.getCommentsByPost(post.id).subscribe(comments => {
  //         forkJoin({
  //           commentJoin: this.commentService.getCommentsByPost(post.id),
  //           usersJoin: this.utilisateurService.getAll()
  //         }).subscribe(({ commentJoin, usersJoin }) => {
  //           post.comments = commentJoin.map((c: any) => {
  //             const user = usersJoin.find((u: any) => u.id === c.user_id);
  //             return {
  //               ...c,
  //               pseudo: user?.pseudo || 'Commentaire inconnu'
  //             };
  //           });
  //           console.log('Commentaires:', post, comments )
  //         });
  //       });
  //         this.loadLikes(post.id);
  //         this.newComment[post.id] = '';
  //         this.showCommentForm[post.id] = false;
  //       });
  //     },
  //     error: err => console.error('Error loading posts:', err)
  //   });
  // }

  // loadComments(postId: number): void {
  //   this.commentService.getCommentsByPost(postId).subscribe({
  //     next: comments => this.comments[postId] = comments,
  //     error: err => {
  //       console.error('Error loading comments:', err);
  //       this.comments[postId] = [];
  //     }
  //   });
  // }


  // loadComments(postId: number): void {
  //   const post = this.posts.find(p => p.id === postId);
  //   if (!post) return;
  
  //   this.commentService.getCommentsByPost(postId).subscribe(comments => {
  //     forkJoin({
  //       commentJoin: this.commentService.getCommentsByPost(postId),
  //       usersJoin: this.utilisateurService.getAll()
  //     }).subscribe(({ commentJoin, usersJoin }) => {
  //       post.comments = commentJoin.map((c: any) => {
  //         const user = usersJoin.find((u: any) => u.id === c.user_id);
  //         return {
  //           ...c,
  //           utilisateur: user?.pseudo || 'Commentaire inconnu'
  //         };
  //       });
  //       console.log('Commentaires:', post )
  //     });
  //   });
  // }
  

  loadLikes(postId: number): void {
    this.likeService.getLikesByPost(postId).subscribe({
      next: (likes) => {
        this.likedPosts[postId] = likes.some(like => like.userId === this.currentUserId);
        const post = this.posts.find(p => p.id === postId);
        if (post) post.likes = likes.length;
      },
      error: err => {
        console.error('Error loading likes:', err);
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  createPost() {
    const postBody = {
      content: this.nouveauPost.content,
      media: this.nouveauPost.media,
      link: this.nouveauPost.link
    };
  
    this.postService.createPost(postBody).subscribe({
      next: (response) => {
        console.log("Post créé :", response);
        this.nouveauPost = { content: '', media: '', link: '' };
        
      },
      error: (error) => {
        console.error("Erreur création :", error);
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

  // addComment(postId: number): void {
  //   const content = this.newComment[postId]?.trim();
  //   if (!content) return;

  //   this.commentService.createComment(postId, content, this.currentUserId).subscribe({
  //     next: comment => {
  //       this.comments[postId] = this.comments[postId] || [];
  //       this.comments[postId].unshift(comment);
  //       this.newComment[postId] = '';
  //       this.showCommentForm[postId] = false;
  //     },
  //     error: err => console.error('Error adding comment:', err)
  //   });
  // }

  toggleComments(postId: number): void {
    if (this.showComments[postId]) {
      this.showComments[postId] = false;
    } else {
      this.loadCommentsForPost(postId); // active aussi le flag dans le subscribe
    }
  }
  


  addComment(postId: number): void {
    const content = this.newComment[postId]?.trim();
    if (!content) return;
  
    this.commentService.createComment(postId, { content }).subscribe({
      next: () => {
        // Recharge seulement les commentaires de CE post
        this.loadCommentsForPost(postId);
  
        // Reset le champ du commentaire
        this.newComment[postId] = '';
      },
      error: err => console.error('Erreur lors de l\'ajout du commentaire :', err)
    });
  }
  
  







cancelComment(postId: number): void {
    this.newComment[postId] = '';
    this.showCommentForm[postId] = false;
  }





  // deleteComment(commentId: number, postId: number): void {
  //   if (!confirm('Êtes-vous sûr?')) return;
  //   this.commentService.deleteComment(commentId).subscribe({
  //     next: () => {
  //       this.comments[postId] = this.comments[postId].filter(c => c.id !== commentId);
  //     },
  //     error: err => console.error('Error deleting comment:', err)
  //   });
  // }

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

  deletePost(postId: number): void {
    if (!confirm('Delete this post?')) return;
    this.postService.deletePost(postId).subscribe({
      
      error: err => console.error('Error deleting post:', err)
    });
  }

  isImage(url: string) {
    return /\.(jpe?g|png|gif|webp)$/i.test(url);
  }

  isVideo(url: string) {
    return /\.(mp4|webm|ogg)$/i.test(url);
  }
}











