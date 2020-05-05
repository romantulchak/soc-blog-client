import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { SetAvatarComponent } from '../set-avatar/set-avatar.component';

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
}