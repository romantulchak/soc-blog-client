import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Image } from '../model/image.model';
import { Observable, BehaviorSubject } from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable({
    providedIn:'root'
})
export class ImageSerivce{
    constructor(private http:HttpClient){}

    public imageCounter: BehaviorSubject<number> = new BehaviorSubject(null); 

    getImagesForUser(userId:number):Observable<Image[]>{
        let params = new HttpParams();
        params = params.append('userId', userId.toString());

        return this.http.get<Image[]>(API_URL + 'images/', {params:params})
    }
    removeImage(imageId: number, userId:number){
        return this.http.delete(API_URL + 'images/delete/'+ imageId + '/' + userId, {responseType:'text'});
    }
}