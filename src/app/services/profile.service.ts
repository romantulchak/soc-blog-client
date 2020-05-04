import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;
@Injectable({
    providedIn:'root'
})
export class ProfileService{
    constructor(private http: HttpClient){

    }

    getUserData(userId: number):Observable<User>{
        console.log(userId);
        return this.http.get<User>(API_URL + 'profile/getUserData/' + userId);
    }
}