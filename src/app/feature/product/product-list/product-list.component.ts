import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product.class';
import { SystemService } from 'src/app/service/system.service';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  title: string = 'Product List';
  products: Product[] = [];
  loggedUser: User = null;

  constructor(
    private productSvc: ProductService,
    private sysSvc: SystemService
  ) {}

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.loggedUser = this.sysSvc.loggedInUser;
    this.productSvc.list().subscribe((jr) => {
      this.products = jr.data as Product[];
      console.log('List of products', this.products);
    });
  }
}