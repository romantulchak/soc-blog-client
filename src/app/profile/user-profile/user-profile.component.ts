import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { User } from 'src/app/model/user.model';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public currentUser: User;
  constructor(private tokenStorage: TokenStorageService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.getUserData();
  }
  getUserData(){
    this.profileService.getUserData(this.currentUser.id).subscribe(
      res=>{
        this.currentUser = res;
      }
    );
  }
}
