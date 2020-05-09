import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationBox } from '../model/notificationBox.model';
import { Notification } from '../model/notification.model';
import { ProfileService } from '../services/profile.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css']
})
export class NotificationDialogComponent implements OnInit {

  public notifications: Notification[];
  private notificationBox: NotificationBox;
  constructor(@Inject(MAT_DIALOG_DATA) private userId: number, private profilerService: ProfileService) { }

  ngOnInit(): void {
    this.getUserNotifications();
  }

  getUserNotifications(){

    this.profilerService.getNotificationsForUser(this.userId).subscribe(

      res=>{
        this.notifications = res.notifications;
        this.notificationBox = res;
      }

    );
  }

  readNotification(notification: Notification){
      if(!notification.isRead){
        this.profilerService.readNotification(this.notificationBox.id, notification.id).subscribe(
          res=>{
            this.notifications = res.notifications;
            this.profilerService.notificationCounter.next(res.notificationCounter);
          }
        );
      }
  }
}
