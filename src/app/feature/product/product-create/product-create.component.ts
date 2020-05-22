import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  title: string = 'Product Create';
  product: Product = new Product();
  submitBtnTitle: string = 'Create';
  vendors: Vendor[] = [];

  constructor(
    private productSvc: ProductService,
    private vendorSvc: VendorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.vendorSvc.list().subscribe((jr) => {
      this.vendors = jr.data as Vendor[];
    });
  }

  save() {
    this.productSvc.create(this.product).subscribe((jr) => {
      if (jr.errors == null) {
        this.router.navigateByUrl('/product/list');
        console.log(this.product);
      } else {
        console.log(
          '***Error creating new Product***',
          this.product,
          jr.errors
        );
      }
    });
  }

  compVendor(a: Vendor, b: Vendor): boolean {
    return a && b && a.id === b.id;
  }

  backClicked() {}
}