import { Component, OnInit, AfterViewInit, Input, ElementRef } from '@angular/core';
import { User } from '../model/user.model';
import { TokenStorageService } from '../services/token-storage.service';
import { DialogService } from '../services/dialog.service';
import { ProfileService } from '../services/profile.service';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Router } from '@angular/router';
import { NotificationBox } from '../model/notificationBox.model';
import { Notification } from '../model/notification.model';
import { SearchService } from '../services/search.service';
import { Tag } from '../model/tag.model';
import { Post } from '../model/post.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  host:{
    '(document:click)': 'closeSearch()',
  }
})
export class NavbarComponent implements OnInit {
  @Input() user: User;
  public notificationCounter: number;
  public isNotifications: boolean = false;
  public isDropDownOpen: boolean = false;
  public showNotificationDialog: boolean = false;
  public notifications: Notification[];
  private notificationBox: NotificationBox;
  public loaded: boolean = false;
  public users: User[];
  public tags: Tag[];
  public posts: Post[];
  public searchLoader:boolean;
  public searchPeople:boolean;
  public searchTags:boolean;
  public searchPosts: boolean;
  public closeSearchDialog:boolean;
  constructor(private searchService: SearchService,
     private profileService: ProfileService,
      private rxStompService: RxStompService,
      public router: Router,
      private tokenStorage: TokenStorageService,
      private profilerService: ProfileService,
      private el: ElementRef
      ) { }

  ngOnInit(): void {
    this.getNotificationsForUser();
    this.updateNotifications();
    this.profileService.notificationCounter.subscribe(
      res=>{
        this.notificationCounter = res;
      }
    );
  }
  private closeSearch(event) {
    if(this.closeSearchDialog = true){
      this.closeSearchDialog = false;
    }
  }



  private getUserNotifications(){
    this.loaded = false;
    this.profilerService.getNotificationsForUser(this.user.id).subscribe(
      res=>{
        if(res != null){

          this.notifications = res.notificationDTOS;
          this.notificationBox = res;

          setTimeout(() => {
            this.loaded = true;
          }, 1000);
        }

      }
    );
  }

  openNotificationDialog(){
    this.isNotifications = !this.isNotifications;
    this.showNotificationDialog = !this.showNotificationDialog;
    if(this.isNotifications){
      this.getUserNotifications();
    }

  }

  public getNotificationsForUser(){
    this.profileService.getNotificationsForUser(this.user.id).subscribe(
      res=>{
          this.notificationCounter = res.notificationCounter;

      }
    );
  }
  readNotification(notification: Notification){
    if(!notification.isRead && notification != null){
      this.profilerService.readNotification(this.notificationBox.id, notification.id).subscribe(
        res=>{
          this.profilerService.notificationCounter.next(res.notificationCounter);
        }
      );
    }
  }

  private updateNotifications(){
      this.rxStompService.watch('/topic/notification').subscribe(obj =>{
        if(this.user.id === JSON.parse(obj.body)){
          this.getNotificationsForUser();
        }
    });
  }
  public logout(){
    this.tokenStorage.signOut();
    window.location.reload();
    this.router.navigate(['/']);
  }

  public search(str: string){
    this.searchLoader = true;
    this.closeSearchDialog = true;
    if(str.startsWith('@')){
        this.findPeople(str);
    }else if(str.startsWith('#')){
      this.findTags(str);
    }else{
      this.findPosts(str);
    }
  }

  private findPosts(str:string){
    this.searchTags = false;
    this.searchPeople = false;
    this.searchPosts = true;
    this.searchService.searchPosts(str).subscribe(
      res=>{
        if(res != null){
          this.posts = res;
          console.log(res);

          setTimeout(() => {
            this.searchLoader = false;
          }, 500);
        }
      }
    );
  }
  private findTags(str:string){
    this.searchTags = true;
    this.searchPeople = false;
    this.searchPosts = false;
    this.searchService.searchTags(str.replace('#','')).subscribe(
      res=>{
        if(res != null){
          this.tags = res;
          setTimeout(() => {
            this.searchLoader = false;
          }, 500);
        }
      }
    );
  }

  private findPeople(str:string){
    this.searchPeople = true;
    this.searchTags = false;
    this.searchPosts = false;
    this.searchService.searchPeople(str.replace("@", '')).subscribe(
      res=>{
          if(res != null){
            this.users = res;
            setTimeout(() => {
              this.searchLoader = false;
            }, 500);
          }
      }
    );
  }
}
