import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class LoadingService{
    public loading = false;
    constructor(){}

    showLoader(){
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
        }, 1200);
    }


}