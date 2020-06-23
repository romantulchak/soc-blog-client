import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../model/post.model';
import { CommentService } from '../services/comment.service';
import { Comment } from '../model/commnet.model';
import { User } from '../model/user.model';
import { TokenStorageService } from '../services/token-storage.service';
import { RxStompService } from '@stomp/ng2-stompjs';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  private postId: number; 
  public post: Post;
  public page: number = 0;
  private user: User;
  public comment: Comment = new Comment();
 
  public commentText: string = null; 
  public comments: Comment[];
  constructor(private activetedRoute: ActivatedRoute, private postService: PostService, private commentService: CommentService, private tokenStorageService: TokenStorageService, private rxService: RxStompService) {
    this.postId = Number.parseInt(this.activetedRoute.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    this.getPostById();
    this.getCommentsForPost();
    this.updateComments();
    
  }

  private getPostById(){
    this.postService.getPostById(this.postId, this.user.id).subscribe(
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

  public addComment(){
    
    this.comment.text = this.commentText.trim();
    this.commentService.addComments(this.comment, this.user.id, this.post.id).subscribe(
     res=>{
       this.commentText = '';
       this.rxService.publish({destination:'/app/updateComments', body:res.id.toString()});
      }
    );
    


  }

  private updateComments(){
    this.rxService.watch('/topic/updateComments').subscribe(
      res=>{
       
        
        if(res != null){
         if(this.post.id === JSON.parse(res.body).post.id){
           this.comments.unshift(JSON.parse(res.body));
         }
        }
        
      }
    );
  }
 

}

