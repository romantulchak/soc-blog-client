import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Post } from '../model/post.model';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../model/user.model';
import { PostService } from '../services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogModel } from '../model/dialog.model';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { DialogService } from '../services/dialog.service';
import { RxStompService } from '@stomp/ng2-stompjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {


  @Input() posts: Post[];

  @Input() exploer: boolean = false;

  public currentUser: User;
  constructor(private tokenService: TokenStorageService,private postService: PostService,  private rxStompService: RxStompService, private dialogService: DialogService) { }
  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
    this.updateLikes();
  }



  private updateLikes(){
    this.postService.updatePost.subscribe(
      res=>{
        if(res != null){
         this.posts.find(item=>item.id === res.id).likesCounter = res.likesCounter;
         this.postService.currentUserId.subscribe(
           id=>{
            if(res != null && this.currentUser.id === id){
              this.posts.find(item=>item.id === res.id).meLiked = res.meLiked;
            }
          }
         );
         this.postService.updatePost.next(null);
        }
      }
    );
  }


  public deletePost(post: Post){
    this.dialogService.deletePost(post);
  }

  public editPost(post: Post){
      this.dialogService.editPost(post);
  }

}
