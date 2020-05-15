import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
    providedIn:'root'
})
export class TokenStorageService{
    public isLoggedIn = false;
    public currentUser: User = null;
    public globalCurrentUser: User;
    constructor(){
        this.logged();
    }
    logged(){
        this.isLoggedIn = !!this.getToken();
        if(this.isLoggedIn){
            this.currentUser = this.getUser();
        }
    }

    signOut(){
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.removeItem(USER_KEY);
    }
    public saveToken(token: string){
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.setItem(TOKEN_KEY, token);
    }
    public getToken(){
        return window.localStorage.getItem(TOKEN_KEY);
    }
    public getUser(){
        return JSON.parse(window.localStorage.getItem(USER_KEY));
    }
    public saveUser(user){
        window.localStorage.removeItem(USER_KEY);
        window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
}