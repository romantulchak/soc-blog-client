import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { User } from '../model/user.model';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit(): void {
    
  }


}
