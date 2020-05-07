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

  constructor(private webSocketService: WebSocketService, private profileService: ProfileService){
    let stompClient = this.webSocketService.connect();
    stompClient.connect({},frame=>{
      stompClient.subscribe('/topic/update', res => {
              let parseToJson = JSON.parse(res.body);
              console.log(parseToJson);
              switch(parseToJson.title){
                case 'updatePosts':
                    this.profileService.updateUser.next(true);
                    this.profileService.userId.next(parseToJson.userId);
                  break;
                 case 'startFollowing':
                    this.profileService.updateUser.next(true);
                    this.profileService.userId.next(parseToJson.userId);
                    this.profileService.currentUserId.next(parseToJson.currentUserId);
                  break;
              }


            
        })
    });

  }
}
