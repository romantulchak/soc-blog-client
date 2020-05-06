import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../model/tag.model';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;
@Injectable({
    providedIn:'root'
})
export class TagService{
    constructor(private http: HttpClient){

    }


    getTags():Observable<Tag[]>{
        return this.http.get<Tag[]>(API_URL + 'tags/getTags');
    }
}