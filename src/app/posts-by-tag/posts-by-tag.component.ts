import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../model/post.model';

@Component({
  selector: 'app-posts-by-tag',
  templateUrl: './posts-by-tag.component.html',
  styleUrls: ['./posts-by-tag.component.css']
})
export class PostsByTagComponent implements OnInit {

  private tagName: string;
  public posts: Post[];
  constructor(private activatedRoute: ActivatedRoute, private postService: PostService) {
    this.tagName = this.activatedRoute.snapshot.paramMap.get('name');

   }

  ngOnInit(): void {  
    this.getPostsByTag();
  
  }

  private getPostsByTag(){
    this.postService.getPostsByTag(this.tagName, 0).subscribe(
      res=>{
        this.posts = res.posts;
      }
    );
  }
}
