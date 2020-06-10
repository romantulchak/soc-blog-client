import { Component, OnInit, AfterContentInit, ElementRef, ContentChildren, QueryList, ViewChild } from '@angular/core';
import { SliderItemDirective } from '../directives/sliderItemDirective.directive';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements AfterContentInit {

  @ContentChildren(SliderItemDirective, { read: ElementRef }) items
  : QueryList<ElementRef<HTMLDivElement>>;
@ViewChild('slides') slidesContainer: ElementRef<HTMLDivElement>;

private slidesIndex = 0;
get currentItem(): ElementRef<HTMLDivElement> {
  return this.items.find((item, index) => index === this.slidesIndex);
}

ngAfterContentInit() {
}

ngAfterViewInit() {
}

onClickLeft() {
  this.slidesContainer.nativeElement.scrollLeft -= this.currentItem.nativeElement.offsetWidth;
  
  if (this.slidesIndex > 0) {
    this.slidesIndex--;
  } 
}

onClickRight() {
  this.slidesContainer.nativeElement.scrollLeft += this.currentItem.nativeElement.offsetWidth;

  if (this.slidesIndex < this.items.length - 1) {
    this.slidesIndex ++;
  }

}


}
