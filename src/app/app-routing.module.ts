import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { CheckGuard } from './guards/check.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { SettingsComponent } from './profile/settings/settings.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { User } from './model/user.model';
import { SubscribtionsComponent } from './subscribtions/subscribtions.component';


const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [CheckGuard]},
  {path: 'registration', component: RegisterComponent, canActivate:[CheckGuard]},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard],children:[
    {path:'', redirectTo: 'not-found', pathMatch:'full'},
    {path: 'user/:id', component: UserProfileComponent },
    {path: 'userr/:id', component: UserProfileComponent},
    {path: 'create-post', component: CreatePostComponent},
    {path: 'settings/:id', component: SettingsComponent},
    {path: 'user/:id/subscriptions', component: SubscribtionsComponent},
    {path: 'not-found', component:NotFoundComponent}
  ]},
  {path: 'login', component: LoginComponent, canActivate: [CheckGuard]},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
