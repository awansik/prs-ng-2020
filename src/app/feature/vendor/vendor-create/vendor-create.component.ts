import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/service/vendor.service';
import { Vendor } from 'src/app/model/vendor.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-create',
  templateUrl: '../vendor-maint-shared/vendor-maint.component.html',
  styleUrls: ['./vendor-create.component.css'],
})
export class VendorCreateComponent implements OnInit {
  title: string = 'Vendor-Create';
  submitBtnTitle: string = 'Create';
  vendor: Vendor = new Vendor();

  constructor(private vendorSvc: VendorService, private router: Router) {}

  ngOnInit(): void {}

  save() {
    this.vendorSvc.create(this.vendor).subscribe((jr) => {
      if (jr.errors == null) {
        this.router.navigateByUrl('/vendor/list');
      } else {
        console.log('***Error creating new Vendor', this.vendor, jr.errors);
      }
    });
  }
}