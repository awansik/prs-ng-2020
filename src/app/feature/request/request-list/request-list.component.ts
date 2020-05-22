import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Request } from 'src/app/model/request.class';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css'],
})
export class RequestListComponent implements OnInit {
  title: string = 'Request List';
  requests: Request[] = [];
  myRequests: Request[] = [];
  user: User = null;

  constructor(
    private requestSvc: RequestService,
    private sysSvc: SystemService
  ) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;

    this.requestSvc.list().subscribe((jr) => {
      if (jr.errors == null) {
        this.requests = jr.data as Request[];
        console.log('List of requests', this.requests);
        for (let request of this.requests) {
          if (this.user.id == request.user.id) {
            this.myRequests.push(request);
          }
        }
      }
      else {
        console.log("*** Error getting request list", jr.errors);
      }
    });
  }
}