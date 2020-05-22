import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { LineItemService } from 'src/app/service/line-item.service';
import { LineItem } from 'src/app/model/line-item.class';
import { Request } from 'src/app/model/request.class';

@Component({
  selector: 'app-line-item-list',
  templateUrl: './line-item-list.component.html',
  styleUrls: ['./line-item-list.component.css'],
})
export class LineItemListComponent implements OnInit {
  title: string = 'Request Line-Items';
  title1: string = 'Lines';
  lineItems: LineItem[] = [];
  requestId: number = 0;
  request: Request = null;
  lineTotal: number = 0;

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
      this.lineItems = jr.data as LineItem[];
    });
  }

  submit() {
    this.requestSvc.submit(this.request).subscribe((jr) => {
      if (jr.errors == null) {
        this.router.navigateByUrl('/request/list');
      } else {
        console.log('Error submitting request: ' + jr.errors);
      }
    });
  }
}