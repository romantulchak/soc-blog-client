import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { User } from 'src/app/model/user.model';
import { ProfileService } from 'src/app/services/profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogService } from 'src/app/services/dialog.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public currentUser: User;
  public thisUser: User;
  public users:User[];
  public userId: number;
  
  public test: number;

  constructor(public loadingService: LoadingService, public dialog: DialogService, private notificationService: NotificationService,private router: Router, private activeRoute: ActivatedRoute,  private profileService: ProfileService, private tokenStorage: TokenStorageService) { 
      this.test = Number.parseInt(this.activeRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.thisUser = this.tokenStorage.getUser();
    this.getNotificationsForUser();
    this.getUserData();
    this.getUsers();

    

    this.profileService.updateUser.subscribe(
      res=>{
        if(res === true){
          this.profileService.userId.subscribe(
            id=>{
              if(id === this.userId){
                console.log("ID SOCKET: "+id);
                if(id != null){
                  this.profileService.currentUserId.subscribe(
                    cur=>{
                      console.log("CURRENT ID: "+id);
                     if(cur != null){
                      this.getUserById(id, cur);
                      this.profileService.updateUser.next(false);
                     }
                    }
                  );
                }  
              }
            }
          );
        }
      }
    );
  }
 
  getUserData(){
    this.profileService.user.subscribe(
      res=>{
        if(res != null){
          this.currentUser = res;
         
          this.getUserById(this.test, this.currentUser.id);
          this.loadingService.showLoader();
          if(res.isNew && this.thisUser.id === res.id){
            this.router.navigateByUrl(`/profile/settings/${this.thisUser.id}`);
            this.notificationService.success('Let\'s set up your profile');
          }
        }
      }
    );
  }
 
  getUserById(userId: number, currentUserId?:number){

    
    
    this.profileService.getUserById(userId, currentUserId).subscribe(
      res=>{
        if(res != null){
          window.scrollTo(0, 0);
          this.loadingService.showLoader();
          this.userId = userId;
          this.currentUser = res;
        }
      }
    );
  }
  getUsers(){
      this.profileService.getUsers().subscribe(
        res=>{
          this.users = res;
        }
      );
  }
  
  startFollowing(){
    this.profileService.startFollowing(this.currentUser.id, this.thisUser.id).subscribe(
      res=>{
        this.notificationService.success(res);
      }
    );
  }
  stopFollowing(){
    this.profileService.stopFollowing(this.currentUser.id, this.thisUser.id).subscribe(
      res=>{
        this.notificationService.success(res);
      }
    );
  }






/* */
 public getNotificationsForUser(){
   this.profileService.getNotificationsForUser(this.thisUser.id).subscribe(
     res=>{

       this.profileService.notificationCounter.next(res.notificationCounter);
       this.profileService.notificationBox.next(res);
     }
   );
 } 



}
