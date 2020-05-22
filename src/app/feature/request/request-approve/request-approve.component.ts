import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { RequestService } from 'src/app/service/request.service';
import { Request } from 'src/app/model/request.class';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css'],
})
export class RequestApproveComponent implements OnInit {
  title: String = 'PurchaseRequest Approve/Reject';
  title1: string = 'Lines';
  user: User = null;
  lineItems: LineItem[] = [];
  lineTotal: number = 0;
  request: Request = null;
  requestId: number = 0;

  constructor(
    private sysSvc: SystemService,
    private router: Router,
    private route: ActivatedRoute,
    private requestSvc: RequestService,
    private liSvc: LineItemService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((parms) => (this.requestId = parms['id']));
    this.requestSvc.get(this.requestId).subscribe((jr) => {
      if (!jr.errors) {
        this.request = jr.data as Request;
      } else {
        console.log('***Error getting request');
      }
    });
    this.liSvc.list(this.requestId).subscribe((jr) => {
      if (!jr.errors) {
        this.lineItems = jr.data as LineItem[];
      } else {
        console.log('***Error getting line-items');
      }
    });
    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;
  }

  accept() {
    this.requestSvc.approve(this.request).subscribe((jr) => {
      if (!jr.errors) {
        this.router.navigateByUrl('/request/review/' + this.user.id);
      } else {
        console.log('***Error approving request***' + jr.errors);
      }
    });
  }

  reject() {
    // this.requestSvc.edit(this.request).subscribe((jr) => {
    //   if (!jr.errors) {
    //   } else {
    //     console.log(
    //       '***Error adding justification***',
    //       this.request,
    //       jr.errors
    //     );
    //   }
    // });
    this.requestSvc.reject(this.request).subscribe((jr) => {
      if (!jr.errors) {
        this.router.navigateByUrl('/request/list');
      } else {
        console.log('***Error rejecting Request***' + jr.errors);
      }
    });
  }
}