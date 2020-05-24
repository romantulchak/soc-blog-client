import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../model/commnet.model';
import { environment } from 'src/environments/environment';
import { CommentPageable } from '../model/commentPageable.model';

const API_URL = environment.apiUrl;
@Injectable({
    providedIn: 'root'
})
export class CommentService{

    constructor(private http: HttpClient){
        
    }

    getCommentsForPost(postId:number, page:number): Observable<CommentPageable>{
        let params = new HttpParams();
        params = params.append('page', page.toString())
        return this.http.get<CommentPageable>(API_URL + 'comments/commentsByPost/' + postId, {params: params});
    }
}