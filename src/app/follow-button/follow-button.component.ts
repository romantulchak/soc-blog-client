import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, SimpleChange, SimpleChanges } from '@angular/core';
import { User } from '../model/user.model';
import { RxStompService } from '@stomp/ng2-stompjs';
import { ProfileService } from '../services/profile.service';
import { NotificationService } from '../services/notification.service';
import { FollowButton } from '../model/followButton.model';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css'],
})
export class FollowButtonComponent implements OnInit {

  @Input() thisUser: User;
  @Input() currentUser: User;
  constructor(private rxStompService: RxStompService, private profileService: ProfileService, private notificationService: NotificationService) { }

  ngOnInit(): void {


    this.profileService.updateFollowButton.subscribe(
      res=>{
        if(res != null && this.currentUser.id == res.id){
          this.currentUser.isSubscribe = res.isSubscribe;
        }
      }
    );
  }

  public startFollowing(){
  
    this.profileService.startFollowing(this.currentUser.id, this.thisUser.id).subscribe(
      res=>{
 
        this.profileService.updateFollowButton.next(new FollowButton(this.currentUser.id, true));
        this.notificationService.success(res);
        this.rxStompService.publish({destination:'/app/startFollow/', body: this.currentUser.id.toString() })
      }
    );
  }
 
  public stopFollowing(){
    this.profileService.stopFollowing(this.currentUser.id, this.thisUser.id).subscribe(
      res=>{
        this.profileService.updateFollowButton.next(new FollowButton(this.currentUser.id, false));
        this.notificationService.success(res);
      }
    );
  }
}
