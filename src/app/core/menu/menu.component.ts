import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item.class';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  user: User = null;

  constructor(private sysSvc: SystemService) {}

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;
    if (this.user.reviewer == true) {
      this.menuItems = [
        new MenuItem('Home', '/home', 'Home'),
        new MenuItem('User', '/user/list', 'User List'),
        new MenuItem('Vendor', '/vendor/list', 'Vendor List'),
        new MenuItem('Product', '/product/list', 'Product List'),
        new MenuItem('Request', '/request/list', 'Request List'),
        new MenuItem(
          'Review',
          '/request/review/' + this.user.id,
          'Review Requests'
        ),
        new MenuItem('Login', '/user/login', 'User Login'),
        new MenuItem('About', '/about/misc', 'About'),
      ];
    } else {
      this.menuItems = [
        new MenuItem('Home', '/home', 'Home'),
        new MenuItem('User', '/user/list', 'User List'),
        new MenuItem('Vendor', '/vendor/list', 'Vendor List'),
        new MenuItem('Product', '/product/list', 'Product List'),
        new MenuItem('Request', '/request/list', 'Request List'),
        new MenuItem('Login', '/user/login', 'User Login'),
        new MenuItem('About', '/about/misc', 'About'),
      ];
    }
  }
}