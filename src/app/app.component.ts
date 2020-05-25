import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from './services/webSocket.service';
import { ProfileService } from './services/profile.service';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Subscription } from 'rxjs';
import { User } from './model/user.model';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ScoblogFrontEnd';
  private interval: any;
  constructor(private tokenStorage: TokenStorageService, private rxStompService: RxStompService, private profileService: ProfileService){

  }
 

  private topicSubscription: Subscription;
  private currentUser: User;
  ngOnInit(){
    this.currentUser = this.tokenStorage.getUser();
    if(this.currentUser != null){
      this.setOnline();
    }
    this.topicSubscription = this.rxStompService.watch('/topic/online').subscribe(obj =>{
      if(obj.body != null){
        this.currentUser.isOnline = JSON.parse(obj.body);
      }

        
    });
  }

  private setOnline(){
   this.rxStompService.publish({destination: '/app/setOnline/' + this.currentUser.id, body: 'true'})
  }



  
 

}
