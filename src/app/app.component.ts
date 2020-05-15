import { Component } from '@angular/core';
import { WebSocketService } from './services/webSocket.service';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ScoblogFrontEnd';
  private interval: any;
  constructor(private webSocketService: WebSocketService, private profileService: ProfileService){
    this.connection();
  }
  private connection(){
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
        window.clearInterval(this.interval);
    }, 
    error=>{
      if(error != null){
        
        this.interval = setInterval(()=>{
          console.log('Reconnect');
          this.connection();
          
        },10000);
       }
    }
    );

  }
}
