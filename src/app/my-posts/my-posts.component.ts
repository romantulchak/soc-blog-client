import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post.model';
import { PostService } from '../services/post.service';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  public posts: Post[];
  private user:User;
  private page: number = 0;
  constructor(private postService: PostService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.currentUser;
    this.getMyPosts();
  }
  private getMyPosts(){
    this.postService.getMyPosts(this.user.id, 0, this.user.id).subscribe(
      res=>{
        this.posts = res.posts;
      }
    );
  }
  public onScroll() {
    this.postService.getMyPosts(this.user.id, this.page + 1, this.user.id).subscribe(
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
}
