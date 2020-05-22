import { Component, OnInit } from '@angular/core';
import { LineItemService } from 'src/app/service/line-item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product.class';

@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css'],
})
export class LineItemEditComponent implements OnInit {
  title: string = 'Line-Item-Edit';
  submitBtnTitle: string = 'Edit';
  lineItemId: number = 0;
  lineItem: LineItem = new LineItem();
  products: Product[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private liSvc: LineItemService,
    private productSvc: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((parms) => (this.lineItemId = parms['id']));
    this.liSvc.get(this.lineItemId).subscribe((jr) => {
      this.lineItem = jr.data as LineItem;
    });
    this.productSvc.list().subscribe((jr) => {
      this.products = jr.data as Product[];
    });
  }

  // this.route.params.subscribe(params => this.lineItemId = params['id']);

  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }

  save() {
    this.liSvc.edit(this.lineItem).subscribe((jr) => {
      if (jr.errors == null) {
        this.router.navigateByUrl(
          '/line-item/list/' + this.lineItem.request.id
        );
      } else {
        console.log('Error editing line-item', this, this.lineItem, jr.errors);
      }
    });
  }
}