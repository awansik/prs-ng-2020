import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css'],
})
export class RequestReviewComponent implements OnInit {
  title: string = 'Review Submitted Requests';
  requests: Request[] = [];
  user: User = null;
  userId: number = 0;
  loggedInUser: User = null;

  constructor(
    private route: ActivatedRoute,
    private sysSvc: SystemService,
    private requestSvc: RequestService
  ) {}

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;
    // this.route.params.subscribe(
    //   (parms) => (this.loggedInUser.id = parms['id'])
    // );
    this.requestSvc.review(this.user.id).subscribe((jr) => {
      this.requests = jr.data as Request[];
      console.log(this.requests);
    });
  }
}