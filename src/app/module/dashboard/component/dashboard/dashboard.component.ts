import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../core/service/user.service';
import {User} from '../../../core/model/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user: User;

  public constructor(private userService: UserService) {
  }

  public ngOnInit(): void {
    this.user = this.userService.findUserAccount();
  }
}
