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
  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private tokenStorage: TokenStorageService) {
    this.tagName = this.activatedRoute.snapshot.paramMap.get('name');

   }

  ngOnInit(): void {  
    this.currentUser = this.tokenStorage.getUser();
    this.getPostsByTag();
  
  }

  private getPostsByTag(){
    this.postService.getPostsByTag(this.tagName, 0, this.currentUser.id).subscribe(
      res=>{
        this.posts = res.posts;
      }
    );
  }
}
