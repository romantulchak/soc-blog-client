import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../model/country.model';

const API_URL = environment.apiUrl;
@Injectable({
    providedIn:'root'
})
export class ProfileService{
    public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
   
    public updateUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public userId: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    public currentUserId: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    public redirectAfterLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor(private http: HttpClient){
    }
    getUserData(userId: number):Observable<User>{
        return this.http.get<User>(API_URL + 'profile/getUserData/' + userId);
    }
    getCountries(): Observable<Country[]>{
        return this.http.get<Country[]>("../../assets/json/countries.json");
    }
    getCitiesForCountry(): Observable<any>{
        return this.http.get<any>("../../assets/json/countries.min.json");
    }
    setAvatar(image:any, userId: number){
        return this.http.put(API_URL + 'profile/setAvatar/' +userId ,image, {responseType:'text'} );
    }
    updateUserData(user: User){
        return this.http.put(API_URL + 'profile/updateUserData', user, {responseType:'text'});
    }

    getUsers(): Observable<User[]>{
        return this.http.get<User[]>(API_URL + 'profile/users');
    }
    getUserById(userId: number, currentUserId: number): Observable<User>{
        return this.http.get<User>(API_URL + 'profile/userById/' + userId + '/' + currentUserId);
    }
    startFollowing(userId: number, currentUserId: number){
        return this.http.put(API_URL + 'profile/startFollowing/' + userId + '/' + currentUserId, null, {responseType: 'text'});
    }
    stopFollowing(userId: number, currentUserId: number){
        return this.http.put(API_URL + 'profile/stopFollowing/' + userId + '/' + currentUserId,null, {responseType:'text'});
    }
}