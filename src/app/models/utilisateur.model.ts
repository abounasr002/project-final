export interface Utilisateur {
    id?: number;
    nom: string;
    email: string;
    password?: string;
    bio?: string;
    profilePicture?: string;
    socialLinks?: any;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  