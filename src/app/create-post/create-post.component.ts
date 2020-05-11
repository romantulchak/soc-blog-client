import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../model/post.model';
import { NotificationService } from '../services/notification.service';
import { Tag } from '../model/tag.model';
import { TagService } from '../services/tag.service';
import { User } from '../model/user.model';
import { TokenStorageService } from '../services/token-storage.service';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  public post: Post;
  public tags: Tag[];
  public user:User;
  constructor(private storageToken: TokenStorageService, private tagService: TagService, private postService: PostService, private notificationService: NotificationService) { }
  public tools: object = {
    items: [
           'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
           'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
           'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
           'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
           'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
           'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
   };

   @ViewChild('fromRTE') private rteEle: RichTextEditorComponent;

  ngOnInit(): void {
    this.user = this.storageToken.getUser();
    this.post = new Post();
    this.getTags();
  }

  rteCreated(): void {
    this.rteEle.element.focus();
}

  public createPost(){
    this.post.user = new User();
    this.post.user.id = this.user.id;
    console.log(this.post);
    this.postService.createPost(this.post).subscribe(
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
        }
      }
    );
  }

  public onToolbarClick(e: any): void {
    if (e.item != null && e.item.id == "imageRTE_toolbar_Image") { // Checked if image toolbar is clicked 
      let element: any = document.getElementById('imageRTE_upload') // Image uploader element 
      console.log(element);
      
      //  element.ej2_instances[0].uploading = function upload(args) { // Added updating event on image uploader 
      //  args.currentRequest.setRequestHeader('Authorization', "Bearer ${token}"); // Setting additional headers
     // }
    }
  }
}
