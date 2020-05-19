import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../model/post.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  private postId: number;
  public post: Post;
  constructor(private activetedRoute: ActivatedRoute, private postService: PostService) {
    this.postId = Number.parseInt(this.activetedRoute.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    this.getPostById();
  }

  private getPostById(){
    this.postService.getPostById(this.postId).subscribe(
      res=>{
        this.post = res;
      }
    );
  }
}
