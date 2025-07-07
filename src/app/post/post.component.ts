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

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PostComponent implements OnInit {
  posts: any[] = [];
  nouveauPost: any = { content: '', media: '', link: '' };
  comments: { [postId: number]: any[] } = {};
  newComment: { [postId: number]: string } = {};
  showCommentForm: { [postId: number]: boolean } = {};
  showForm = false;
  currentUserId = 1; // Simulado
  likedPosts: { [postId: number]: boolean } = {};
currentUserAvatar: any;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private likeService: LikeService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: posts => {
        this.posts = posts;
        posts.forEach(post => {
          this.loadComments(post.id);
          this.loadLikes(post.id);
          this.newComment[post.id] = '';
          this.showCommentForm[post.id] = false;
        });
      },
      error: err => console.error('Error loading posts:', err)
    });
  }

  // loadComments(postId: number): void {
  //   this.commentService.getCommentsByPost(postId).subscribe({
  //     next: comments => this.comments[postId] = comments,
  //     error: err => {
  //       console.error('Error loading comments:', err);
  //       this.comments[postId] = [];
  //     }
  //   });
  // }


  loadComments(postId: number): void {
  this.commentService.getCommentsByPost(postId).subscribe({
    next: comments => {
      // Ordenar comentarios por fecha descendente (más reciente primero)
      this.comments[postId] = comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
    error: err => {
      console.error('Error loading comments:', err);
      this.comments[postId] = [];
    }
  });
}

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

  createPost(): void {
    const postData = {
      ...this.nouveauPost,
      userId: this.currentUserId
    };
    this.postService.createPost(postData).subscribe({
      next: () => {
        this.loadPosts();
        this.nouveauPost = { content: '', media: '', link: '' };
        this.showForm = false;
      },
      error: err => console.error('Error creating post:', err)
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





  addComment(postId: number): void {
  const commentContent = { content: this.comments}
  if (!commentContent) return;

  this.commentService.createComment(postId, commentContent).subscribe({
    next: () => {
      this.newComment[postId] = '';
      this.showCommentForm[postId] = false;
      // Recargar los comentarios desde el servidor para que aparezcan correctamente
      this.loadComments(postId);
    },
    error: err => console.error('Error adding comment:', err)
  });
}








cancelComment(postId: number): void {
    this.newComment[postId] = '';
    this.showCommentForm[postId] = false;
  }





  deleteComment(commentId: number, postId: number): void {
    if (!confirm('Êtes-vous sûr?')) return;
    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments[postId] = this.comments[postId].filter(c => c.id !== commentId);
      },
      error: err => console.error('Error deleting comment:', err)
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

  deletePost(postId: number): void {
    if (!confirm('Delete this post?')) return;
    this.postService.deletePost(postId).subscribe({
      next: () => this.loadPosts(),
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











