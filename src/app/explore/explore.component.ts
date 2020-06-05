import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  constructor(private profileService: ProfileService, private tokenStorageSerivce:TokenStorageService) { }
  private user: User;
  public users: User[];
  ngOnInit(): void {
    this.user = this.tokenStorageSerivce.getUser();
    this.explorePeople();

  }
  private explorePeople(){
    this.profileService.explorePeople(this.user.id).subscribe(
      res=>{
       if(res != null){
         this.users = res;
       }
        
      }
    );
  }

}
