import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../model/post.model';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-posts-by-tag',
  templateUrl: './posts-by-tag.component.html',
  styleUrls: ['./posts-by-tag.component.css']
})
export class PostsByTagComponent implements OnInit {

  private tagName: string;
  public posts: Post[];
  public currentUser: User;
  public page: number = 0;
  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private tokenStorage: TokenStorageService) {
    this.tagName = this.activatedRoute.snapshot.paramMap.get('name');
    this.activatedRoute.params.subscribe(
      res=>{
        this.currentUser = this.tokenStorage.getUser();

        this.getPostsByTag(res.name);
      }
    );
   }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.getPostsByTag(this.tagName);

  }

  private getPostsByTag(tagName:string){
    this.postService.getPostsByTag(tagName, this.page, this.currentUser.id).subscribe(
      res=>{
        this.posts = res.posts;
      }
    );
  }

  public onScroll() {
    this.postService.getPostsByTag(this.tagName, this.page + 1, this.currentUser.id).subscribe(
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
