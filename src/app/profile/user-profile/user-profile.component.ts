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
  constructor(public loadingService: LoadingService, public dialog: DialogService, private notificationService: NotificationService,private router: Router, private activeRoute: ActivatedRoute,  private profileService: ProfileService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.thisUser = this.tokenStorage.getUser();
    this.getUserData();
    this.getUsers();



    this.profileService.updateUser.subscribe(
      res=>{
        if(res === true){
          this.profileService.userId.subscribe(
            id=>{
              if(id === this.userId){
                this.getUserById(id);
                this.profileService.updateUser.next(false);
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
          this.loadingService.showLoader();
          if(res.isNew && this.thisUser.id === res.id){
            this.router.navigateByUrl(`/profile/settings/${this.thisUser.id}`);
            this.notificationService.success('Let\'s set up your profile');
          }
        }
      }
    );
  }
 
  getUserById(userId: number){
    this.userId = userId;
    this.profileService.getUserById(userId).subscribe(
      res=>{
        if(res != null){
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
  
  

}
