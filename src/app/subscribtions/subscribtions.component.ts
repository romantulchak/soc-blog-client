import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionsService } from '../services/subscriptions.service';
import { User } from '../model/user.model';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-subscribtions',
  templateUrl: './subscribtions.component.html',
  styleUrls: ['./subscribtions.component.css']
})
export class SubscribtionsComponent implements OnInit {

  public users: User[];

  private userId: number;
  public currentUser: User;
  constructor(private tokenStorage: TokenStorageService, private route: ActivatedRoute, private subscriptionsService: SubscriptionsService) { 
    this.userId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.getSubscriptions();
  }

  private getSubscriptions(){
    this.subscriptionsService.getSubscriptions(this.userId, this.currentUser.id).subscribe(
      res=>{
     
          this.users = res;
      }
    );
  }

}
