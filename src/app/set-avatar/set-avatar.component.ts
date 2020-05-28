import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { ProfileService } from '../services/profile.service';

import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { NotificationService } from '../services/notification.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgxImageCompressService, DOC_ORIENTATION } from 'ngx-image-compress';
import { CompressImage } from '../services/compressImage.service';

@Component({
  selector: 'app-set-avatar',
  templateUrl: './set-avatar.component.html',
  styleUrls: ['./set-avatar.component.css']
})
export class SetAvatarComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private userId:number,private compressImage: CompressImage, private imageCompress: NgxImageCompressService,  private profileService: ProfileService, private notificationService: NotificationService) { }
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  private fullFile:File;
  ngOnInit(): void {
  }


  fileChangeEvent(event: any): void {
      
    this.fullFile = event.target.files[0];
    let orientation: DOC_ORIENTATION;
    
    const reader = new FileReader();
    reader.readAsDataURL(this.fullFile);
    reader.onload = () => {
      this.imageCompress.compressFile(reader.result,orientation,80, 90 ).then(
        result=>{
        
          this.fullFile = new File([this.compressImage.b64toBlob(result)], 'avatar.jpg');
          console.log(this.fullFile);
          
        }
      ); 
    };

   
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
