// export interface Utilisateur {
//     id?: number;
//     nom: string;
//     email: string;
//     password?: string;
//     bio?: string;
//     profilePicture?: string;
//     socialLinks?: any;
//     role: string;
//     createdAt?: Date;
//     updatedAt?: Date;
//   }
  


export interface Utilisateur {
followingCount: any;
followersCount: any;
prenom: any;
isVerified: any;
avatarUrl: any;
  id: number;
  nom: string;
  pseudo: string; // Asegúrate de que esta propiedad exista
  email: string;
  password: string;
  bio: string;
  profilePicture: string;
  socialLinks: any; // o un tipo más específico si lo tienes
  role: string;
  createdAt: Date;
  updatedAt: Date;
}