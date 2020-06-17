import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { User } from '../model/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from '../services/profile.service';
import { Image } from '../model/image.model';
import { ImageSerivce } from '../services/image.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'gallery-photo-app',
  templateUrl: './gallery-photo.component.html',
  styleUrls: ['./gallery-photo.component.css']
})
export class GalleryPhotoComponent implements OnInit {
  public currentUser:User;
  public userInSystem: User;
  public images: Image[];
  public imageViewerPath: string;
  @Input() full: boolean = false;
  @Input() min: boolean = false;
  constructor(private dialogFromTemplate: MatDialog,private tokenStorage:TokenStorageService,  private profileService: ProfileService, private imageService: ImageSerivce) { }

  ngOnInit(): void {
    this.userInSystem = this.tokenStorage.getUser();
    this.getUserPhotos();
  }
  public avatarViewer(imagePath: string, templateRef: TemplateRef<any>){ 
    this.imageViewerPath = imagePath;
    this.dialogFromTemplate.open(templateRef, {
      panelClass: 'image__viewer_container'
    });
  }

  public getUserPhotos(){
    this.profileService.userPhotos.subscribe(
      res=>{
        if(res != null){
          this.currentUser = res;
          this.imageService.getImagesForUser(res.id).subscribe(
            images=>{
 
              this.imageService.imageCounter.next(images.length);             
              this.images = images;
            }
          );
          
        }
      }
    );
  }
  removeImage(image: Image){
    this.imageService.removeImage(image.id, this.userInSystem.id).subscribe(
      res=>{
        console.log(res);
        
      }
    );
  }
}
