import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: '../user-maint-shared/user-maint.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  title: string = 'User-Edit';
  submitBtnTitle: string = 'Update';
  user: User = new User();
  userId: number = 0;

  constructor(
    private userSvc: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((parms) => (this.userId = parms['id']));
    this.userSvc.get(this.userId).subscribe((jr) => {
      this.user = jr.data as User;
      console.log('User found!', this.user);
    });
  }

  save() {
    this.userSvc.edit(this.user).subscribe((jr) => {
      if (jr.errors == null) {
        this.router.navigateByUrl('/user/list');
      } else {
        console.log('***Error saving new user***', this.user, jr.errors);
      }
    });
  }
}