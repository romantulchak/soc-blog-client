import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Country } from 'src/app/model/country.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User = new User();
  public countries: Country[];
  public filteredCountries: Country[];
  public isSuccessful = false;
  public isSignUpFailed = false;
  public errorMessage = '';
  
  constructor(private authService: AuthService) { 

  }
  ngOnInit(): void {
    this.getCountries();
  }

  register(){
    this.authService.register(this.user).subscribe(
      res=>{
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err=>{
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
  getCountries(){
    this.authService.getCountries().subscribe(
      res=>{
        this.countries = res;
      }
    );
  }
}
