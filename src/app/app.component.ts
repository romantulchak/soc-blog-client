import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/webSocket.service';
import { ProfileService } from './services/profile.service';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ScoblogFrontEnd';
  private interval: any;
  constructor(private webSocketService: WebSocketService, private profileService: ProfileService, private rxStompService: RxStompService){
    //this.connection();
  }
 
 /* private connection(){
    let stompClient = this.webSocketService.connect();
   
    stompClient.connect( {},frame=>{
      stompClient.subscribe('/topic/update', res => {
              let parseToJson = JSON.parse(res.body);
            
              console.log(parseToJson);
              switch(parseToJson.title){
                case 'updatePosts':
                    this.profileService.updateUser.next(true);
                    this.profileService.userId.next(parseToJson.userId);
                  break;
                 case 'startFollowing':
                 //   this.profileService.updateUser.next(true);
                   // this.profileService.userId.next(parseToJson.userId);
                    //this.profileService.currentUserId.next(parseToJson.currentUserId);
                    this.profileService.notificationCounterForAnotherUser.next(parseToJson.notificationCounter);
                    
                    this.profileService.updateNotifciationCounter.next(true);
                  break;
                  case 'stopFollowing':
                 // this.profileService.updateUser.next(true);
                 // this.profileService.userId.next(parseToJson.userId);
                  //this.profileService.currentUserId.next(parseToJson.currentUserId);
                  break;
              }
        })
    });

  }*/
  private topicSubscription: Subscription;
  ngOnInit(){
    this.topicSubscription = this.rxStompService.watch('/topic/update').subscribe(obj =>{
      console.log(obj);
      
    })
  }

 

}
