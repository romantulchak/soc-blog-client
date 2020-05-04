import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{
    
    constructor(private authService: TokenStorageService, private router: Router){}
    
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{

        if(this.authService.currentUser != null){ 
            return true;
        }else{            
            this.router.navigate(['/']);
            return false;
        }

    }


}