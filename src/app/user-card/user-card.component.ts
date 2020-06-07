import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { User } from '../model/user.model';
import { TokenStorageService } from '../services/token-storage.service';
import { ProfileService } from '../services/profile.service';
import { UserProfileComponent } from '../profile/user-profile/user-profile.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;
  @Input() users: User[];
  @Input() slider: boolean = false;
  public currentUser: User;
  constructor(private tokenStorage: TokenStorageService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
  }
}
