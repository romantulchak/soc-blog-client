import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class LoggedIn implements CanActivate{
    constructor(private authService: TokenStorageService, private router: Router){}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        if(this.authService.currentUser != null){
            this.router.navigateByUrl('/profile/user/' + this.authService.currentUser.id);
            return true;
        }else{
            this.router.navigateByUrl('/profile/not-found/');
            return false;
    
        }
    }
}