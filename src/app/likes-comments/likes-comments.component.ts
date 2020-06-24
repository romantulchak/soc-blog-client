import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../model/post.model';
import { User } from '../model/user.model';
import { TokenStorageService } from '../services/token-storage.service';
import { RxStompService } from '@stomp/ng2-stompjs';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-likes-comments',
  templateUrl: './likes-comments.component.html',
  styleUrls: ['./likes-comments.component.css']
})
export class LikesCommentsComponent implements OnInit {

  @Input() post:Post;
  constructor(private tokenService: TokenStorageService,private postService:PostService,  private rxStompService: RxStompService) { }
  public currentUser: User;
  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
    this.checkLikes();
    this.updateLikes();
  }
  public setLike(post: Post){
    this.rxStompService.publish({destination: '/app/setLike/' + this.currentUser.id + '/' + post.id});
  }

  public checkLikes(){
    this.rxStompService.watch('/topic/like/').subscribe(
      res=>{
        if(res != null){
          this.postService.updatePost.next(JSON.parse(res.body));   
        }
      }
    );
    this.rxStompService.watch('/topic/myLike/').subscribe(
      res=>{
        if(res != null){
          this.postService.currentUserId.next(Number.parseInt(res.body)); 
        }
      }
    );
  }


  private updateLikes(){
    this.postService.updatePost.subscribe(
      res=>{
        if(res != null){
         
          this.postService.currentUserId.subscribe(
           id=>{
            if(res != null && res.id == this.post.id && this.currentUser.id === id){
              this.post.likesCounter = res.likesCounter;    
              this.post.meLiked = res.meLiked;
            }
          }
         );
         this.postService.updatePost.next(null);
        }
      }
    );
  }
  

}
