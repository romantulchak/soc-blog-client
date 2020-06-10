import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post.model';
import { PostService } from '../services/post.service';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';
import { RxStompService } from '@stomp/ng2-stompjs';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  public posts: Post[];
  public userId:number;
  public user: User;
  private page: number = 0;
  constructor(private postService: PostService, private tokenStorage: TokenStorageService, private activatedRoute: ActivatedRoute, private rxStompService: RxStompService) { 
    
  }

  ngOnInit(): void {
    this.user = this.tokenStorage.currentUser;
    this.activatedRoute.params.subscribe(
      params=>{
        this.userId = params.id;
        this.getMyPosts();
      }
    );
      this.updatePosts();
  }
  private getMyPosts(){
    this.postService.getMyPosts(this.userId, 0, this.user.id).subscribe(
      res=>{
        this.posts = res.posts;
      }
    );
  }
  public onScroll() {
    this.postService.getMyPosts(this.userId, this.page + 1, this.user.id).subscribe(
      posts=>{
        if(posts != null){
          this.page = posts.currentPage;
          posts.posts.forEach(
            el=>{
              this.posts.push(el);
            }
          );
        }
      }
    );
  }


  private updatePosts(){
    this.rxStompService.watch('/topic/updatePost').subscribe(
      res=>{
        if(res != null){
          this.posts.unshift(JSON.parse(res.body));
        }
      }
    );
    this.rxStompService.watch('/topic/updatePost/delete').subscribe(
      res=>{
        if(res != null){
          this.getMyPosts();
        }
      }
    );
  }

}
