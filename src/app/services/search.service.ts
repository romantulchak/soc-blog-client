import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../model/user.model';
import { environment } from 'src/environments/environment';
import { Tag } from '../model/tag.model';
import { Post } from '../model/post.model';

const API_URL = environment.apiUrl;
@Injectable({
    providedIn:'root'
})

export class SearchService{
    constructor(private http:HttpClient){

    }

    searchPeople(username:string): Observable<User[]>{
        let params = new HttpParams();
        params = params.append('username', username);
        return this.http.get<User[]>(API_URL + 'search/searchPeople', {params:params});
    }
    searchTags(tag:string):Observable<Tag[]>{
      let params = new HttpParams();
      params = params.append('tag', tag);
      return this.http.get<Tag[]>(API_URL + 'search/searchTags', {params:params});
    }
    searchPosts(name:string):Observable<Post[]>{
      let params = new HttpParams();
      params = params.append('name', name);
      return this.http.get<Post[]>(API_URL + 'search/searchPosts', {params:params});
    }
}
