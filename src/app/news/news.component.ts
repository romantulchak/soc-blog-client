import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../model/user.model';
import { Post } from '../model/post.model';
import { PostPageable } from '../model/postPageable.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private postService: PostService, private tokenStorage: TokenStorageService) { }

  public user: User;
  public posts: Post[];
  public currentPage: number = 0;
  ngOnInit(): void {
    this.user = this.tokenStorage.currentUser;
    this.getNews();
  }


  getNews(){
    this.postService.getPostBySubscribtions(this.user, 0).subscribe(
      res=>{
        this.posts = res.posts;
        console.log(this.posts);
        
      }
    );
  }
  onScroll() {
    this.postService.getPostBySubscribtions(this.user, this.currentPage + 1).subscribe(
      posts=>{
        if(posts != null){
          console.log('Current page ' + this.currentPage);
          this.currentPage = posts.currentPage;
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
