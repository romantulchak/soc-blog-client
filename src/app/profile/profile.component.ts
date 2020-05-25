import { Component, OnInit, OnDestroy } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { User } from '../model/user.model';
import { ProfileService } from '../services/profile.service';
import { DialogService } from '../services/dialog.service';
import { RxStompService } from '@stomp/ng2-stompjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {


  constructor(private tokenStorage: TokenStorageService,private activeRouter: ActivatedRoute, private router:Router, private profileService: ProfileService, private dialogService: DialogService, private rxStompService: RxStompService) {

      this.activeRouter.params.subscribe(
        res=>{
        
          
          this.getUserData();
        }
      );
   }
   public currentUser: User;
  private userLoggedIn: User;
  public notificationCounter: number;
  ngOnInit(): void {
    this.userLoggedIn = this.tokenStorage.getUser();
    this.currentUser = this.tokenStorage.getUser();
    if(this.currentUser != null){
      //this.router.navigate(['/profile/user/' + this.currentUser.id]);
      this.getUserData();
     
      this.getNotificationsForUser();
    }
    this.profileService.notificationCounter.subscribe(
      res=>{
        this.notificationCounter = res;
      }
    );
    
    this.updateNotifications();


  }

  private updateNotifications(){
      this.rxStompService.watch('/topic/notification').subscribe(obj =>{
        if(this.userLoggedIn.id === JSON.parse(obj.body)){
          this.getNotificationsForUser();
        }
    });
  }

  getUserData(){
    if(this.userLoggedIn != null){
      
      this.profileService.getUserData(this.userLoggedIn.id).subscribe(
        res=>{
          this.currentUser = res;
          this.tokenStorage.globalCurrentUser = res;
          this.profileService.user.next(res);
          console.log(res);
          
          if(res.isNew){
            this.router.navigateByUrl('/profile/settings/'+this.currentUser.id);
          }
        }
      );
  
    }
  }


  logout(){

    this.rxStompService.publish({destination: '/app/setOnline/' + this.currentUser.id, body: 'false'})

    
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

  ngOnDestroy(){
    this.rxStompService.publish({destination: '/app/setOnline/' + this.currentUser.id, body: 'false'})
    

  }
}
