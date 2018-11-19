import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../module/core/model/user.model';
import {UserService} from '../../module/core/service/user.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @Input()
  public user: Observable<User>;

  @Input()
  public direction: string = 'left';

  public sideMenuOpened: boolean = false;

  public constructor(private userService: UserService) { }

  public ngOnInit(): void {
    this.user = this.userService.findUserAccount();
  }
}
