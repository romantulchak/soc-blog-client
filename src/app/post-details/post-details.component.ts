import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../model/post.model';
import { CommentService } from '../services/comment.service';
import { Comment } from '../model/commnet.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  private postId: number;
  public post: Post;
  public page: number = 0;
  public comments: Comment[];
  constructor(private activetedRoute: ActivatedRoute, private postService: PostService, private commentService: CommentService) {
    this.postId = Number.parseInt(this.activetedRoute.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }

  private getPostById(){
    this.postService.getPostById(this.postId).subscribe(
      res=>{
        if(res != null)
          this.post = res;
      }
    );
  }
  private getCommentsForPost(){
    this.commentService.getCommentsForPost(this.postId, this.page).subscribe(
      res=>{
        if(res != null)
          this.comments = res.comments;  
      }
    );

  }
}

