import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user: User;
  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if(this.tokenStorage.globalCurrentUser != null){
      this.user = this.tokenStorage.globalCurrentUser;
      }else{
        this.user = this.tokenStorage.getUser();
      }
  }

}
