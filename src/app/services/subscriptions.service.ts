import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

const API_URL = environment.apiUrl;

@Injectable({
    providedIn:'root'
})
export class SubscriptionsService{
    constructor(private http: HttpClient){

    }
  
    
    getSubscriptions(userId:number, currentUserId: number): Observable<User[]>{
        return this.http.get<User[]>(API_URL + 'profile/subscriptions/' + userId + '/' + currentUserId);
    }
    getSubscribers(userId: number, currentUserId: number): Observable<User[]>{
        return this.http.get<User[]>(API_URL + 'profile/subscribers/' + userId + '/' + currentUserId);
    }
}