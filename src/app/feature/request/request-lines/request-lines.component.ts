import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { Request } from 'src/app/model/request.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { LineItem } from 'src/app/model/line-item.class';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css'],
})
export class RequestLinesComponent implements OnInit {
  title: string = 'Request-Lines';
  title1: string = 'Lines';
  request: Request = new Request();
  requestId: number = 0;
  lineItems: LineItem[] = [];
  lineItem: LineItem = new LineItem();
  lineItemId: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestSvc: RequestService,
    private liSvc: LineItemService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((parms) => (this.requestId = parms['id']));
    this.requestSvc.get(this.requestId).subscribe((jr) => {
      this.request = jr.data as Request;
    });
    this.liSvc.list(this.requestId).subscribe((jr) => {
      if (!jr.errors) {
        this.lineItems = jr.data as LineItem[];
      } else {
        console.log('***Error getting request');
      }
    });
  }

  submit() {
    this.requestSvc.submit(this.request).subscribe((jr) => {
      if (jr.errors == null) {
        this.router.navigate(['/request/list']);
      } else {
        console.log('***Error submitting request***' + jr.errors);
      }
    });
  }

  remove(lineItemId: number) {
    this.liSvc.delete(lineItemId).subscribe((jr) => {
      this.requestSvc.get(this.requestId).subscribe((jr1) => {
        this.request = jr1.data as Request;
      });
      this.liSvc.list(this.requestId).subscribe((jr2) => {
        if (!jr2.errors) {
          this.lineItems = jr2.data as LineItem[];
        } else {
          console.log('***Error getting request***');
        }
      });
    });
  }
}