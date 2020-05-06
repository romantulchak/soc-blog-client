import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, private router:Router, private profileService: ProfileService) { }
  public currentUser: User;
  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    if(this.currentUser != null){
      this.getUserData();
      this.router.navigate(['/profile/user/' + this.currentUser.id]);
    }
  }

  getUserData(){
   
    this.profileService.getUserData(this.currentUser.id).subscribe(
      res=>{
        this.currentUser = res;
        this.profileService.user.next(res);
        console.log(res);
        
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

}
