import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService) { }
  public user: User;
  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
  }

}
