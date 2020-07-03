import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { Country } from '../model/country.model';

const API_URL = environment.apiUrl;
const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json' }),
}
@Injectable({
    providedIn:'root'
})
export class AuthService{
    constructor(private http: HttpClient){

    }
    login(user: User): Observable<any>{
        return this.http.post<any>(API_URL + 'auth/signin', user, httpOptions);
    }

    register(user: User): Observable<any>{
        return this.http.post<any>(API_URL + 'auth/signup', user, httpOptions);
    }


}