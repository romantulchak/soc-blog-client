import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { User } from '../model/user.model';
import { TokenStorageService } from '../services/token-storage.service';
import { DialogService } from '../services/dialog.service';
import { ProfileService } from '../services/profile.service';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Router } from '@angular/router';
import { NotificationBox } from '../model/notificationBox.model';
import { Notification } from '../model/notification.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
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

  constructor(private dialogService: DialogService,
     private profileService: ProfileService,
      private rxStompService: RxStompService,
      public router: Router,
      private tokenStorage: TokenStorageService,
      private profilerService: ProfileService
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
  private getUserNotifications(){
    this.loaded = false;
    this.profilerService.getNotificationsForUser(this.user.id).subscribe(
      res=>{
        if(res != null){
          console.log(res);
          
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
      console.log(notification);
      
      this.profilerService.readNotification(this.notificationBox.id, notification.id).subscribe(
        res=>{
          //this.notifications = res.notificationDTOS;
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
}
