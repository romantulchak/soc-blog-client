import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../model/post.model';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../model/user.model';
import { PostService } from '../services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogModel } from '../model/dialog.model';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {


  @Input() posts: Post[];

  public currentUser: User;
  constructor(private tokenService: TokenStorageService, private postService: PostService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
  }
  public deletePost(post: Post){
    this.dialogService.deletePost(post);
   
  }
  
}
