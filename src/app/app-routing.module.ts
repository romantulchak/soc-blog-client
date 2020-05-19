import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { CheckGuard } from './guards/check.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { SettingsComponent } from './profile/settings/settings.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { SubscribtionsComponent } from './subscribtions/subscribtions.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { LoggedIn } from './guards/loggedin.guard';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { NewsComponent } from './news/news.component';
import { PostsByTagComponent } from './posts-by-tag/posts-by-tag.component';
import { PostDetailsComponent } from './post-details/post-details.component';



const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [CheckGuard]},
  {path: 'registration', component: RegisterComponent, canActivate:[CheckGuard]},
  {path: 'profile', component: ProfileComponent, data: { animation: 'isLeft' }, canActivate:[AuthGuard],children:[
    {path:'', component: ProfileComponent, canActivate: [LoggedIn]},
    {path: 'user/:id', component: UserProfileComponent, data: { animation: 'isLeft' } },
    {path: 'userr/:id', component: UserProfileComponent, data:{animation: 'isRight'}},
    {path: 'create-post', component: CreatePostComponent, data:{animation: 'isLeft'}},
    {path: 'settings/:id', component: SettingsComponent, data:{animation: 'isRight'}},
    {path: 'user/:id/subscriptions', component: SubscribtionsComponent, data:{animation: 'isRight'}},
    {path: 'user/:id/subscribers', component: SubscribersComponent, data:{animation: 'isRight'}},
    {path: 'my-posts', component: MyPostsComponent, data:{animation: 'isRight'}},
    {path: 'not-found', component:NotFoundComponent}
  ]},
  {path: 'login', component: LoginComponent, canActivate: [CheckGuard]},
  {path: 'news', component: NewsComponent},
  {path: 'posts-by-tag/:name', component: PostsByTagComponent},
  {path: 'post/:id', component: PostDetailsComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
