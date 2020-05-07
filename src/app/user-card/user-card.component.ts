import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { User } from '../model/user.model';
import { TokenStorageService } from '../services/token-storage.service';
import { ProfileService } from '../services/profile.service';
import { LoadingService } from '../services/loading.service';
import { UserProfileComponent } from '../profile/user-profile/user-profile.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() users: User[];
  @ViewChild(UserProfileComponent) userChilde: UserProfileComponent;
  public currentUser: User;
  constructor(private tokenStorage: TokenStorageService, private profileService: ProfileService, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
  }
  getUserById(userId: number, currentUserId?:number){
   
 
      console.log('uraa');
      this.userChilde.getUserById(userId, currentUserId);
    
    
  
  }
}
