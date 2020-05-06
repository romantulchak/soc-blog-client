import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Post } from '../model/post.model';

const API_URL = environment.apiUrl;
@Injectable({
    providedIn:'root'
})
export class PostService{
    constructor(private http:HttpClient){}
    
    createPost(post: Post){
       return this.http.post(API_URL + 'posts/createPost', post, {responseType:'text'});
    }
    
}