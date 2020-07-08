import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../model/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../model/country.model';
import { NotificationBox } from '../model/notificationBox.model';
import { Post } from '../model/post.model';
import { FollowButton } from '../model/followButton.model';
import { Tag } from '../model/tag.model';

const API_URL = environment.apiUrl;
@Injectable({
    providedIn:'root'
})
export class ProfileService{
    public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

    public redirectAfterLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public notificationCounter: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public isOnline: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public userPhotos: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    public updateFollowButton: BehaviorSubject<FollowButton> = new BehaviorSubject<FollowButton>(null);
    constructor(private http: HttpClient){
    }
    getUserData(userId: number):Observable<User>{
        return this.http.get<User>(API_URL + 'profile/getUserData/' + userId);
    }
    getCountries(): Observable<Country[]>{
        return this.http.get<Country[]>("../../assets/json/countries.json");
    }
    getCitiesForCountry(): Observable<any>{
        return this.http.get<any>("../../assets/json/countries.min.json");
    }
    setAvatar(image:any, userId: number, file: File){
        const uploadFile = new FormData();
        uploadFile.append('file', file);
        uploadFile.append('avatar', image);

        return this.http.put(API_URL + 'profile/setAvatar/' +userId ,uploadFile, {responseType:'text'} );
    }
    updateUserData(user: User, username: string){
        let params = new HttpParams();
        params = params.append('username', username);
        console.log(user);

        return this.http.put(API_URL + 'profile/updateUserData', user, {responseType:'text', params: params});
    }

    getUserById(userId: number, currentUserId: number): Observable<User>{
        return this.http.get<User>(API_URL + 'profile/userById/' + userId + '/' + currentUserId);
    }
    startFollowing(userId: number, currentUserId: number){
        return this.http.put(API_URL + 'profile/startFollowing/' + userId + '/' + currentUserId, null, {responseType: 'text'});
    }
    stopFollowing(userId: number, currentUserId: number){
        return this.http.put(API_URL + 'profile/stopFollowing/' + userId + '/' + currentUserId,null, {responseType:'text'});
    }
    getNotificationsForUser(userId: number): Observable<NotificationBox>{
        return this.http.get<NotificationBox>(API_URL + 'profile/getNotificationsForUser/' + userId);
    }
    readNotification(notificationBoxId: number, notificationId: number): Observable<NotificationBox>{
        return this.http.put<NotificationBox>(API_URL + 'profile/readNotification/' + notificationBoxId + '/' + notificationId, null);
    }
    explorePeople(userId:number):Observable<User[]>{
        return this.http.get<User[]>(API_URL + 'profile/explore/' + userId);
    }
    addInterests(tag: Tag){
        return this.http.put(API_URL + 'profile/addInterests', tag, {responseType:'text'});
    }
    changePassword(newUserPassword:any){
        return this.http.put(API_URL + 'profile/changePassword', newUserPassword, {responseType:'text'});
    }
    deleteUserPhoto(userId: number, imageId: number){
        let params = new HttpParams();
        params = params.append('userId', userId.toString()).append('imageId', imageId.toString());
        return this.http.delete(API_URL + 'profile/deleteImage', {responseType: 'text', params:params});
    }
    deleteAccount(userId:number){
        return this.http.delete(API_URL + 'profile/removeAccount/' + userId);
    }
}
