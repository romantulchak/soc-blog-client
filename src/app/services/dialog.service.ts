import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { SetAvatarComponent } from '../set-avatar/set-avatar.component';
import { NotificationBox } from '../model/notificationBox.model';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { Notification } from '../model/notification.model';
import { Post } from '../model/post.model';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { DialogModel } from '../model/dialog.model';

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

    notificationDialog(userId:number){
        this.dialog.open(NotificationDialogComponent, {
            data: userId
        })
    }
    deletePost(post: Post){
        this.dialog.open(PostDialogComponent, {
            data:new DialogModel(post.id, 'delete', post.name)
          })
    }
}