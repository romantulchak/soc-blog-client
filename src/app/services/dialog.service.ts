import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { SetAvatarComponent } from '../set-avatar/set-avatar.component';
import { NotificationBox } from '../model/notificationBox.model';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { Notification } from '../model/notification.model';

@Injectable({
    providedIn:'root'
})
export class DialogService{
    constructor(private dialog: MatDialog){

    }
    setAvatar(userId: number){
        const dialog = this.dialog.open(SetAvatarComponent, {
            data: userId
        });

        dialog.afterClosed().subscribe(
            res=>{
                window.location.reload();
            }
        );
    }

    notificationDialog(notificationBox: NotificationBox){
        this.dialog.open(NotificationDialogComponent, {
            data:notificationBox
        })
    }
}