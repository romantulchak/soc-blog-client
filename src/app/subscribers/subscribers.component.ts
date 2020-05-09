import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionsService } from '../services/subscriptions.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  public users: User[];

  private userId: number;
  public currentUser: User;
  constructor(private tokenStorage: TokenStorageService, private route: ActivatedRoute, private subscriptionsService: SubscriptionsService) { 
    this.userId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.getSubscribers();
  }

  private getSubscribers(){
    this.subscriptionsService.getSubscribers(this.userId, this.currentUser.id).subscribe(
      res=>{
        console.log(res);
          this.users = res;
      }
    );
  }

}
