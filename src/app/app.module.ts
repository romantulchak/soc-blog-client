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

import { ChartModule, LineSeriesService, DataLabelService, TooltipService, LegendService, CategoryService, StripLineService, DateTimeCategoryService, DateTimeService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts';
import { PostDetailsComponent } from './post-details/post-details.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';

import { RxStompConfig } from './config/rx-stomp.config';
import { NavbarComponent } from './navbar/navbar.component';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import {NgxImageCompressService} from 'ngx-image-compress';
import { ExploreComponent } from './explore/explore.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FollowButtonComponent } from './follow-button/follow-button.component';
import { SliderComponent } from './slider/slider.component';
import { SliderItemDirective } from './directives/sliderItemDirective.directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { GalleryPhotoComponent } from './gallery-photo/gallery-photo.component';
import { LikesCommentsComponent } from './likes-comments/likes-comments.component';
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
    SubscribersComponent,
    SafeHtml,
    PostComponent,
    MyPostsComponent,
    NewsComponent,
    LinkifyPipe,
    PostsByTagComponent,
    PostDetailsComponent,
    NavbarComponent,
    PostDialogComponent,
    ExploreComponent,
    GalleryComponent,
    FollowButtonComponent,
    SliderComponent,
    SliderItemDirective,
    GalleryPhotoComponent,
    LikesCommentsComponent,
    
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
    MatTooltipModule,
    ChartModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTabsModule
    
  ],
  providers: [authInterceptorProviders,
     AuthGuard,
      LoggedIn,
      CategoryService,
      LegendService,
       TooltipService,
        DataLabelService,
         LineSeriesService,
          DateTimeService,
          NgxImageCompressService,
           LineSeriesService,
            DateTimeCategoryService,
             StripLineService,
             ColumnSeriesService,
             {
              provide: InjectableRxStompConfig,
              useValue: RxStompConfig
            },
            {
              provide: RxStompService,
              useFactory: rxStompServiceFactory,
              deps: [InjectableRxStompConfig]
            }
            
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
