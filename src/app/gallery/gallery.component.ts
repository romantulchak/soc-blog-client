import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { User } from '../model/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  public currentUser:User;
  public imageViewerPath: string;
  constructor(private dialogFromTemplate: MatDialog, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getUserPhotos();
  }

  public getUserPhotos(){
    this.profileService.userPhotos.subscribe(
      res=>{
        if(res != null){
          this.currentUser = res;
        }
      }
    );
  }

}
