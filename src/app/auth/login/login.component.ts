import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = new User();
  public isLoggedIn = false;
  public isLoginFailed = false;
  public errorMessage = '';
  public roles: string[] = [];
  constructor(private authService: AuthService, private rotuer: Router, private tokenStorage: TokenStorageService, private profileService: ProfileService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      
    }
  }

  login(){
    this.authService.login(this.user).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.user = this.tokenStorage.getUser();
        this.profileService.redirectAfterLogin.next(true);
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  reloadPage(){
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

}
