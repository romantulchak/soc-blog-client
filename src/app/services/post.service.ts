import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Post } from '../model/post.model';

const API_URL = environment.apiUrl;
@Injectable({
    providedIn:'root'
})
export class PostService{
    constructor(private http:HttpClient){}
    
    createPost(post: Post, image: File){
        const data = new FormData();
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        data.append('image', image);
        data.append('postDTO', JSON.stringify(post));


        
       return this.http.post(API_URL + 'posts/createPost', data, {responseType:'text', headers: headers});
    }
    
}