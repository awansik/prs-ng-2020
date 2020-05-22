import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Product } from 'src/app/model/product.class';
import { LineItem } from 'src/app/model/line-item.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css'],
})
export class RequestEditComponent implements OnInit {
  title: string = 'Edit Request';
  requestId: number = 0;
  request: Request = new Request();
  users: User[] = [];
  loggedUser: User = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sysSvc: SystemService,
    private userSvc: UserService,
    private requestSvc: RequestService
  ) {}

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.loggedUser = this.sysSvc.loggedInUser;
    this.route.params.subscribe((parms) => (this.requestId = parms['id']));
    this.requestSvc.get(this.requestId).subscribe((jr) => {
      this.request = jr.data as Request;
    });

    this.userSvc.list().subscribe((jr) => {
      this.users = jr.data as User[];
    });
  }

  compUser(a: User, b: User): boolean {
    return a && b && a.id === b.id;
  }

  save() {
    this.requestSvc.edit(this.request).subscribe((jr) => {
      if (jr.errors == null) {
        this.router.navigateByUrl('/request/list');
      } else {
        console.log('***Error editing request***', this.request, jr.errors);
      }
    });
  }
}