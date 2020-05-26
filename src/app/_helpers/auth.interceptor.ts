import { Injectable } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { HttpInterceptor, HTTP_INTERCEPTORS, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

const TOKEN_HEADER_KEY = 'Authorization';
@Injectable({
    providedIn:'root'
})
export class AuthInterceptor implements HttpInterceptor{
    constructor(private token: TokenStorageService, private router: Router, private notificationSerivce: NotificationService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.token.getToken();
        if(token != null){
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
   
        }
        return next.handle(authReq).pipe(
            catchError(
              (err, caught) => {

                if (err.status === 401){
                    this.notificationSerivce.error('Session Timeout')
                  this.handleAuthError();
                  return of(err);
                }
                throw err;
              }
            )
          );
         
    }
    private handleAuthError() {
        this.token.signOut();
        window.location.href = "/login";
      }
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ];