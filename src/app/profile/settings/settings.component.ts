import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { ProfileService } from 'src/app/services/profile.service';
import { Country } from 'src/app/model/country.model';
import { MatDialog } from '@angular/material/dialog';
import { SetAvatarComponent } from 'src/app/set-avatar/set-avatar.component';
import { DialogService } from 'src/app/services/dialog.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NotificationService } from 'src/app/services/notification.service';


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
  public cityName: string = 'Baku';
 
  constructor(private notificationSerivce: NotificationService, private profileService:ProfileService, public dialog: DialogService, public loadingService: LoadingService) { }
  
  ngOnInit(): void {
    this.getUserData(); 
  }
  getUserData(){
    this.loadingService.showLoader();
    this.profileService.user.subscribe(
      res=>{
        if(res != null){
          this.currentUser = res;
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
        
      }
    );
  }
  changeCitiesByCountry(){
    this.citiesByCountry = this.cities[this.countryName];
  }
  onDateChange(date: Date){
    this.currentUser.birthDay = date;
  }
  updateProfile(){
    this.currentUser.country = this.countryName;
    this.currentUser.city = this.cityName;
    console.log(this.currentUser);
    
    
    this.profileService.updateUserData(this.currentUser).subscribe(
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
}
