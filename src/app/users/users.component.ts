import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './users.component.html'
})
export class UsersComponent {
  usersList: string;
  /**
   *
   */
  constructor(private authService: AuthService, private router: Router) {
    this.authService.user.subscribe(usr => {
      if (!usr) {
        router.navigate(['']);
      }
    });
  }
  save() {
    const users = this.usersList.split(',');
    this.authService.addUsers(users);
  }
}
