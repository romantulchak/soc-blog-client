import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../model/post.model';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {


  @Input() posts: Post[];

  public currentUser: User;
  constructor(private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();

    
  }
  
}
