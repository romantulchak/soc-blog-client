import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class CompressImage{
    constructor(){

    }


    public b64toBlob(dataURI) {

        let byteString = atob(dataURI.split(',')[1]);
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
    
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
    }

}