import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { ProfileService } from '../services/profile.service';
import { DialogService } from '../services/dialog.service';
import { NotificationBox } from '../model/notificationBox.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, private router:Router, private profileService: ProfileService, private dialogService: DialogService) { }
  public currentUser: User;
  private userLoggedIn: User;
  public notificationCounter: number;
  ngOnInit(): void {
    this.userLoggedIn = this.tokenStorage.getUser();
    this.currentUser = this.tokenStorage.getUser();
    if(this.currentUser != null){
      this.getUserData();
      this.router.navigate(['/profile/user/' + this.currentUser.id]);
      this.getNotificationsForUser();
    }

    this.profileService.notificationCounter.subscribe(
      res=>{
        console.log('TRUE FATER ');
        
        this.notificationCounter = res;
      }
    );
    

    this.profileService.updateNotifciationCounter.subscribe(
      res=>{
        if(res === true){
          this.profileService.userId.subscribe(
            id=>{
              
              
              if(id === this.userLoggedIn.id){
                console.log('true');
                this.profileService.notificationCounterForAnotherUser.subscribe(
                  counter =>{
                      
              
                    this.notificationCounter = counter;
                    this.profileService.updateNotifciationCounter.next(false);
                  }
                );
              }
            }
          )
        }
      }
    );

  }

  getUserData(){
  console.log(this.currentUser.id);
    this.profileService.getUserData(this.currentUser.id).subscribe(
      res=>{
        this.currentUser = res;
        console.log(res);
        this.profileService.user.next(res);
        if(res.isNew){
          this.router.navigateByUrl('/profile/settings/'+this.currentUser.id);
        }
      }
    );
  }


  logout(){
    this.tokenStorage.signOut();
    window.location.reload();
    this.router.navigate(['/']);
  }

  public getNotificationsForUser(){
    this.profileService.getNotificationsForUser(this.userLoggedIn.id).subscribe(
      res=>{
        this.notificationCounter = res.notificationCounter;

      }
    );
  } 

  openNotificationDialog(){
  
        this.dialogService.notificationDialog(this.userLoggedIn.id);
  }

}
