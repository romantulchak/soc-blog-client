import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'linkify'
})
export class LinkifyPipe implements PipeTransform{
    
    constructor(private _domSanitizer: DomSanitizer) {}
    
    transform(value: any, ...args: any[]) {
        return this._domSanitizer.bypassSecurityTrustHtml(this.stylize(value));

    }
    private stylize(text: string): string {
        let stylizedText: string = '';
        if (text && text.length > 0) {
          for (let t of text.split(" ")) {
            if (t.startsWith("#") && t.length>1)
              stylizedText += `<a class="tag__link" routerLink='${t.substring(1)}'>${t}</a> `;
            else
              stylizedText += t + " ";
          }
          return stylizedText;
        }
        else return text;
      }
    

}