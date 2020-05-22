import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { Router, ActivatedRoute } from '@angular/router';
import { Vendor } from 'src/app/model/vendor.class';
import { Product } from 'src/app/model/product.class';
import { Request } from 'src/app/model/request.class';
import { ProductService } from 'src/app/service/product.service';
import { LineItemService } from 'src/app/service/line-item.service';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css'],
})
export class LineItemCreateComponent implements OnInit {
  title: string = 'Line-Item-Create';
  lineItem: LineItem = new LineItem();
  products: Product[] = [];
  requests: Request[] = [];
  request: Request = null;
  requestId: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestSvc: RequestService,
    private productSvc: ProductService,
    private liSvc: LineItemService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((parms) => (this.requestId = parms['id']));
    this.requestSvc.get(this.requestId).subscribe((jr) => {
      this.request = jr.data as Request;
    });
    this.productSvc.list().subscribe((jr) => {
      this.products = jr.data as Product[];
    });
    this.requestSvc.list().subscribe((jr) => {
      this.requests = jr.data as Request[];
    });
  }

  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }

  add() {
    this.lineItem.request = this.request;
    this.liSvc.create(this.lineItem).subscribe((jr) => {
      if (jr.errors == null) {
        this.router.navigateByUrl('/request/lines/' + this.lineItem.request.id);
      } else {
        console.log('***Error adding Line-Item***', this.lineItem, jr.errors);
      }
    });
  }
}