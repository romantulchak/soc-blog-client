import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Country } from 'src/app/model/country.model';
import { Router } from '@angular/router';

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
  
  constructor(private authService: AuthService, private router: Router) { 

  }
  ngOnInit(): void {

  }

  register(){
    this.authService.register(this.user).subscribe(
      res=>{
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 500);
      },
      err=>{
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
  
}
