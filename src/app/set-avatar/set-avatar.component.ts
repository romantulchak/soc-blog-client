import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { ProfileService } from '../services/profile.service';

import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { NotificationService } from '../services/notification.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-set-avatar',
  templateUrl: './set-avatar.component.html',
  styleUrls: ['./set-avatar.component.css']
})
export class SetAvatarComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private userId:number, private profileService: ProfileService, private notificationService: NotificationService) { }
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  private fullFile:File;
  ngOnInit(): void {
  }


  fileChangeEvent(event: any): void {
      
    this.fullFile = event.target.files[0];
      
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  cropIt() {
    this.profileService.setAvatar(this.croppedImage, this.userId, this.fullFile).subscribe(
      res=>{
        this.notificationService.success(res);
      }
    );
  }
  imageLoaded() {
    // show cropper
}
cropperReady() {
    // cropper ready
}
loadImageFailed() {
    // show message
}

}
