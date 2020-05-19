import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Post } from '../model/post.model';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { PostPageable } from '../model/postPageable.model';

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

    getMyPosts(userId:number, page: number): Observable<PostPageable>{
        let params = new HttpParams();
        params = params.append('page', page.toString());

        return this.http.get<PostPageable>(API_URL + 'posts/myPosts/' + userId, {params: params});
    }

    getPostBySubscribtions(user: User, page: number): Observable<PostPageable>{
        let params = new HttpParams();
        params = params.append('page', page.toString());
        return this.http.get<PostPageable>(API_URL + 'posts/news/' + user.id, {params: params});
    }

    getPostsByTag(tagName: string, page:number): Observable<PostPageable>{
        let params = new HttpParams();
        params = params.append('page', page.toString());


        return this.http.get<PostPageable>(API_URL + 'posts/postsByTag/' + tagName, {params: params});

    }

    getPostsForChart(currentUser:number): Observable<any>{
        return this.http.get<any>(API_URL + 'posts/postsForChart/' + currentUser );

    }

    getPostById(postId: number): Observable<Post>{
        return this.http.get<Post>(API_URL + 'posts/getPostById/' + postId);
    }
    
}