import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../model/commnet.model';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;
@Injectable({
    providedIn: 'root'
})
export class CommentService{

    constructor(private http: HttpClient){
        
    }

    getCommentsForPost(postId:number): Observable<Comment[]>{
        return this.http.get<Comment[]>(API_URL + 'comments/commentsByPost/' + postId);
    }
}