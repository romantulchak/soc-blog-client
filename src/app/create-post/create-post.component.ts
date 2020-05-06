import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../model/post.model';
import { NotificationService } from '../services/notification.service';
import { Tag } from '../model/tag.model';
import { TagService } from '../services/tag.service';
import { User } from '../model/user.model';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  public post: Post = new Post();
  public tags: Tag[];
  public user:User;
  constructor(private storageToken: TokenStorageService, private tagService: TagService, private postService: PostService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.user = this.storageToken.getUser();
    this.getTags();
  }
  public createPost(){
    this.post.user = new User();
    this.post.user.id = this.user.id;
    console.log(this.post);
    this.postService.createPost(this.post).subscribe(
      res=>{
        this.notificationService.success(res);
      }
    );
  }

  public getTags(){
    this.tagService.getTags().subscribe(
      res=>{
        if(res != null){
          this.tags = res;
        }
      }
    );
  }
}
