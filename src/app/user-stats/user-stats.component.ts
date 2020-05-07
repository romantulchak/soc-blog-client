import { Component, OnInit, Input } from '@angular/core';
import { User } from '../model/user.model';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {

  @Input() user: User;
  @Input() size: string = 'full';
  constructor() { }

  ngOnInit(): void {
  }

}
