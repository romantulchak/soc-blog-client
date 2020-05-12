import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { PostService } from '../services/post.service';
import { Post } from '../model/post.model';
import { NotificationService } from '../services/notification.service';
import { Tag } from '../model/tag.model';
import { TagService } from '../services/tag.service';
import { User } from '../model/user.model';
import { TokenStorageService } from '../services/token-storage.service';
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor'; 
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
RichTextEditor.Inject(Toolbar, Link, HtmlEditor, Image, QuickToolbar); 
import {map, startWith} from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  public htmlContent = '';
  public post: Post = new Post();
  public tags: Tag[];
  public user:User;
  public image: File;
  public imageSettings: any;



  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filterTags: Observable<string[]>;
  taggs: string[] = [];
  tagNames: string[] = [];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;










  constructor(private storageToken: TokenStorageService, private tagService: TagService, private postService: PostService, private notificationService: NotificationService) { 
    this.imageSettings = { 
      saveFormat: "Base64" 
      };
      this.post.text = '';
  }


  public tools: object = {
    items: ['Undo', 'Redo', '|',
        'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
        'SubScript', 'SuperScript', '|',
        'LowerCase', 'UpperCase', '|',
        'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
        'Indent', 'Outdent', '|', 'CreateLink',
        'Image', '|', 'ClearFormat', 'SourceCode', '|', 'FullScreen']
};


  

  ngOnInit(): void {
    this.user = this.storageToken.getUser();
    this.getTags();
  }


  public createPost(){
    this.post.user.id = this.user.id;
    this.taggs.forEach(t=>{
      this.post.tags.push(this.tags.find(x=>x.name === t));
    });
    this.postService.createPost(this.post, this.image).subscribe(
      res=>{
        this.notificationService.success(res);
      }
    );
  }

  public getTags(){
    this.tagService.getTags().subscribe(
      res=>{
        if(res != null){
          this.tags = res;

          res.forEach(el=>{

            this.tagNames.push(el.name);
          });

          this.filterTags = this.fruitCtrl.valueChanges.pipe(
            startWith(null),
            map((tag: string | null) => tag ? this._filter(tag) : this.tagNames.slice()));
        }
      }
    );
  }

  public fileUpload(event:any){
    this.image = event.target.files[0];    
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.taggs.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }


  remove(fruit: string): void {
    const index = this.taggs.indexOf(fruit);

    if (index >= 0) {
      this.taggs.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.taggs.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tagNames.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}
