import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SettingsComponent } from './profile/settings/settings.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SetAvatarComponent } from './set-avatar/set-avatar.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { SubscribtionsComponent } from './subscribtions/subscribtions.component';
import { UserStatsComponent } from './user-stats/user-stats.component';
import { UserCardComponent } from './user-card/user-card.component';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { SafeHtml } from './pipes/safeHtml.pipe';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { LoggedIn } from './guards/loggedin.guard';
import { PostComponent } from './post/post.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { NewsComponent } from './news/news.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LinkifyPipe } from './pipes/linkify.pipe';
import { PostsByTagComponent } from './posts-by-tag/posts-by-tag.component';
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    SettingsComponent,
    CreatePostComponent,
    UserProfileComponent,
    SetAvatarComponent,
    SubscribtionsComponent,
    UserStatsComponent,
    UserCardComponent,
    NotificationDialogComponent,
    SubscribersComponent,
    SafeHtml,
    PostComponent,
    MyPostsComponent,
    NewsComponent,
    LinkifyPipe,
    PostsByTagComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    ImageCropperModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    RichTextEditorModule,
    MatChipsModule,
    MatIconModule,
    InfiniteScrollModule,
    MatTooltipModule
    
  ],
  providers: [authInterceptorProviders, AuthGuard, LoggedIn],
  bootstrap: [AppComponent]
})
export class AppModule { }
