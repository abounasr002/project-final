import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccueilComponent } from './accueil/accueil.component';
import { UtilisateursComponent } from './utilisateur/utilisateur.component';
import { PostComponent } from './post/post.component';
import { FollowersComponent } from './followers/followers.component';




export const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path:'utilisateur', component: UtilisateursComponent } ,
{path:'post', component: PostComponent},
  // { path: '', redirectTo: 'profil/new', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
  {path: 'followers', component: FollowersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
