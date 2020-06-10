import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../model/user.model';
import { PostService } from '../services/post.service';
import { Post } from '../model/post.model';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  constructor(private profileService: ProfileService, private tokenStorageSerivce:TokenStorageService, private postService: PostService) { }
  public currentUser: User;
  public users: User[];
  public posts: Post[];
  private currentPage: number = 0;
  public loading: boolean = false;
  ngOnInit(): void {
    this.currentUser = this.tokenStorageSerivce.getUser();
    this.explorePeople();
    this.explorePosts();

  }
  private explorePeople(){
    this.profileService.explorePeople(this.currentUser.id).subscribe(
      res=>{
       if(res != null){
         this.users = res;
       }
        
      }
    );
  }
  private explorePosts(){
    this.postService.explorePosts(this.currentUser.id, this.currentPage).subscribe(
      res=>{
        if(res != null){
          this.posts = res.posts;
          
        }
      }
    );
  }
  public onScroll(){
    this.loading = true;
    this.postService.explorePosts(this.currentUser.id, this.currentPage+1).subscribe(
      res=>{
        if(res != null){
         setTimeout(() => {
          this.currentPage = res.currentPage;
          res.posts.forEach(el=>{
            this.posts.push(el);
          });
          this.loading = false;
         }, 1500);
        }
      }
    );

  
  }
}
