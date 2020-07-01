import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { ProfileService } from 'src/app/services/profile.service';
import { Country } from 'src/app/model/country.model';
import { MatDialog } from '@angular/material/dialog';
import { SetAvatarComponent } from 'src/app/set-avatar/set-avatar.component';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { Tag } from 'src/app/model/tag.model';
import { TagService } from 'src/app/services/tag.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public currentUser: User;
  public countries: Country[];
  public cities: any;
  public citiesByCountry: any;
  public countryName: string = 'Afghanistan';
  public cityName: string = 'Herat';
  public userId: number;
  public tags: Tag[];
  constructor(private activatedRouter: ActivatedRoute,private tokenStorage: TokenStorageService,  private notificationSerivce: NotificationService, private profileService:ProfileService, public dialog: DialogService, private tagService: TagService ) { 
    this.userId = Number.parseInt(this.activatedRouter.snapshot.paramMap.get('id'));
  }
  
  ngOnInit(): void {
    this.getUserData();
  }
  getUserData(){
    this.profileService.getUserData(this.userId).subscribe(
      res=>{
        if(res != null){
          this.currentUser = res;

          this.getInterests(); 
          
          this.getCountries();
        }
      }
    );
  }
  getCountries(){
    this.profileService.getCountries().subscribe(
      res=>{
        this.countries = res;
        this.getCityies();
        
      }
    );
  }
  getCityies(){
    this.profileService.getCitiesForCountry().subscribe(
      res=>{
        this.cities = res;
        this.citiesByCountry = res['Afghanistan'];
        if(this.currentUser.country != null){
          this.countryName = this.currentUser.country;
          this.citiesByCountry = res[this.countryName];
          this.cityName = this.currentUser.city;
        }
      }
    );
  }
  changeCitiesByCountry(){
    this.citiesByCountry = this.cities[this.countryName];
  }
  onDateChange(date: Date){
    this.currentUser.birthDay = date;
  }
  updateProfile(username: string){
    this.currentUser.country = this.countryName;
    this.currentUser.city = this.cityName;
    this.currentUser.isNew = false;
    this.profileService.updateUserData(this.currentUser, username).subscribe(
      res=>{
        this.notificationSerivce.success(res);
      }
    );
  }
  public setGender(value: string){
    switch(value){
      case "1":
        this.currentUser.gender = 'Female';
        break;
       case "2":
        this.currentUser.gender = 'Male';
         break; 
    }
  }




  private getInterests(){
    this.tagService.getTags().subscribe(
      res=>{
        
        if(res != null){
          this.tags = res;
         if(this.currentUser != null){
           this.tags.forEach(el=>{
             for (let index = 0; index < this.currentUser.interests.length; index++) {
               if(this.currentUser.interests[index].name === el.name){
                 el.myInterest = true;
                 break;
               }
               
             }
           })
           
         }
          
         
        }
      }
    );
  }

  public addToInterests(event:MatCheckboxChange, tag: Tag){
    this.profileService.addInterests(tag, this.userId).subscribe(
      res=>{
        this.notificationSerivce.success(res);
      }
    );
  }

  changePassword(oldPassword: string, newPassword: string, newPasswordRepeat:string){
    
    if(newPassword === newPasswordRepeat){
      this.profileService.changePassword(oldPassword, newPassword, this.userId).subscribe(
        res=>{
          this.notificationSerivce.success(res);
          
        }
      );
    }
  }

  deleteUserAccount(){
    this.profileService.deleteAccount(this.userId).subscribe(
      res=>{
        this.tokenStorage.signOut();
        window.location.reload();
      }
    );
  }
}
