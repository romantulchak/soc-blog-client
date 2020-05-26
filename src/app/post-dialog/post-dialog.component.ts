import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogModel } from '../model/dialog.model';
import { User } from '../model/user.model';
import { TokenStorageService } from '../services/token-storage.service';
import { PostService } from '../services/post.service';
import { RxStompService } from '@stomp/ng2-stompjs';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})
export class PostDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: DialogModel,private postService: PostService,  private tokenStorage: TokenStorageService, public dialog:MatDialog, private rxStompService: RxStompService) { }
  private currentUser: User;
  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
  }

  public deletePost(){
    this.postService.deletePost(this.dialogData.postId, this.currentUser.id).subscribe(
      res=>{
        this.rxStompService.publish({destination:'/app/updatePost/', body: this.currentUser.id.toString()});
        
        this.dialog.closeAll();
      }
    );
  }

}
