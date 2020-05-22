import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Router } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css'],
})
export class RequestCreateComponent implements OnInit {
  title: string = 'Create Request';
  request: Request = new Request();
  user: User = null;
  submitBtnTitle: string = 'Request Create';

  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private sysSvc: SystemService
  ) {}

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;
  }

  save() {
    this.request.user = this.user;
    this.requestSvc.create(this.request).subscribe((jr) => {
      if (!jr.errors) {
        this.router.navigateByUrl('/request/list');
        console.log(this.request);
      } else {
        console.log(
          '***Error creating new Request***',
          this.request,
          jr.errors
        );
      }
    });
  }
}