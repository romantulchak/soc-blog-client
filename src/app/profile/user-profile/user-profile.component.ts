import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { User } from 'src/app/model/user.model';
import { ProfileService } from 'src/app/services/profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogService } from 'src/app/services/dialog.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SafeHtml } from 'src/app/pipes/safeHtml.pipe';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers:[SafeHtml],
})
export class UserProfileComponent implements OnInit {

  public currentUser: User;
  public thisUser: User;
  public users:User[];
  public userId: number;
  public posts: Post[] = [];

  public page: number = 0;

  public test: number;


  public primaryXAxis: Object;
  public postsForChar: any;
  public primaryYAxis: Object;
  public legendSettings: Object;
  public marker: Object;
  public title: string;
  public tooltip: Object;
  public zoom: Object;

  constructor(private postService: PostService, public loadingService: LoadingService, public dialog: DialogService, private notificationService: NotificationService,private router: Router, private activeRoute: ActivatedRoute,  private profileService: ProfileService, private tokenStorage: TokenStorageService) { 
      this.test = Number.parseInt(this.activeRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.thisUser = this.tokenStorage.getUser();
    this.getUserData();
    this.getUsers();

    
    this.getPostsForChart(this.thisUser.id);
  








    this.activeRoute.params.subscribe(
      params=>{
        this.getUserById(params.id, this.thisUser);
        this.getMyPosts(params.id);
        console.log('IDDDDDDDD:' + params.id);
        
      }
    );

/*
    this.profileService.updateUser.subscribe(
      res=>{
        if(res === true){
          this.profileService.userId.subscribe(
            id=>{
              if(id === this.userId){
                console.log('THIS USER ID: ' + this.userId);
                console.log('THIS ID FROM WEBSOCKET: ' + id);
                
                      this.getUserById(id, this.thisUser.id);
                      this.profileService.updateUser.next(false);
                    
               
                
              }
            }
          );
        }
      }
    );
    */
  }
 
  private getPostsForChart(currentUser: number){
    this.postService.getPostsForChart(currentUser).subscribe(
      res=>{
        console.log(res);
        
        this.postsForChar = res;
        this.chart();
      }
    );
  }



  private chart(){
    
    this.primaryXAxis = {  
      valueType: 'DateTimeCategory',
      title: 'Created posts',
      edgeLablePlacment: 'Shift',
      intervalType: 'Days',

    };
    this.primaryYAxis = {
        labelFormat: 'n'
    };
    this.legendSettings = {
        visible: true
    };
    this.tooltip = { enable: true, header: 'Posts', format: '<b>Number of posts : ${point.y}</b>' };
    this.marker = { visible: true, width: 10, height: 10 };
    this.title = 'Posts';
  
    this.zoom = {
      enableSelectionZooming: true,
    };
  
  }

  private getUserData(){
    this.profileService.user.subscribe(
      res=>{
        if(res != null){
          this.currentUser = res;
         
          //this.getUserById(this.test, this.currentUser);
          this.loadingService.showLoader();
          if(res.isNew && this.thisUser.id === res.id){
            this.router.navigateByUrl(`/profile/settings/${this.thisUser.id}`);
            this.notificationService.success('Let\'s set up your profile');
          }
          //this.getMyPosts(this.thisUser.id);
          this.getMyPosts(this.test);
        }
      }
    );
  }
 





  getUserById(userId: number, currentUserId?:User){
    
    this.userId = userId;
    this.profileService.getUserById(userId, currentUserId.id).subscribe(
      res=>{
        console.log(res);
        
        if(res != null){
          window.scrollTo(0, 0);
          this.loadingService.showLoader();
          
          this.currentUser = res;
        }
      }
    );
  }

  private getUsers(){
      this.profileService.getUsers().subscribe(
        res=>{
          this.users = res;
        }
      );
  }
  
  public startFollowing(){
    this.profileService.startFollowing(this.currentUser.id, this.thisUser.id).subscribe(
      res=>{
        this.getUserById(this.currentUser.id,this.thisUser);
        this.notificationService.success(res);
      }
    );
  }
  public stopFollowing(){
    this.profileService.stopFollowing(this.currentUser.id, this.thisUser.id).subscribe(
      res=>{
        this.getUserById(this.currentUser.id,this.thisUser);
        this.notificationService.success(res);
      }
    );
  }

  private getMyPosts(currentUser:number){
    this.page = 0;
    this.postService.getMyPosts(currentUser, this.page).subscribe(
      posts=>{
        if(posts != null){
          console.log(posts);
          
          this.posts = posts.posts;
          this.page = posts.currentPage;
        }
      }
    );
  }

  onScroll() {
    this.postService.getMyPosts(this.currentUser.id, this.page + 1).subscribe(
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



/* */




}
