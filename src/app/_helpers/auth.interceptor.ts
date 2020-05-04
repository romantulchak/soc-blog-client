import { Injectable } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';

const TOKEN_HEADER_KEY = 'Authorization';
@Injectable({
    providedIn:'root'
})
export class AuthInterceptor implements HttpInterceptor{
    constructor(private token: TokenStorageService){

    }
    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
        let authReq = req;
        const token = this.token.getToken();
        if(token != null){
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
   
        }
        return next.handle(authReq);
    }

}
export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ];