import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'stream';
import { Location } from "@angular/common";
import { CommonService } from 'app/created-admin/common.service';

declare const $: any;
// declare interface RouteInfo {
//     path: string;
//     title: string;
//     icon: string;
//     class: string;
// }
// export const ROUTES: RouteInfo[] = [
//     { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-home', class: '' },
//     { path: '/productList', title: 'Product List',  icon:'pe-7s-news-paper', class: '' },
//     { path: '/product', title: 'Product Add/Edit',  icon:'pe-7s-bell', class: '' },
//     { path: '/categoryList', title: 'Category List',  icon:'pe-7s-plugin', class: '' },
//     { path: '/category', title: 'Category Add/Edit',  icon:'pe-7s-bell', class: '' },
//     { path: '/shopList', title: 'Shop List',  icon:'pe-7s-box1', class: '' },
//     { path: '/shop', title: 'Shop Add/Edit',  icon:'pe-7s-bell', class: '' },

//     // { path: '/user', title: 'User Profile',  icon:'pe-7s-user', class: '' },
//     // { path: '/table', title: 'Table List',  icon:'pe-7s-note2', class: '' },
//     // { path: '/typography', title: 'Typography',  icon:'pe-7s-news-paper', class: '' },
//     // { path: '/icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
//     // { path: '/maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
//     // { path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
//     // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'pe-7s-rocket', class: 'active-pro' },
// ];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  // @Output() pointToViewElement = new EventEmitter();
  menuItems: any[];

  constructor(
    private common : CommonService
  ) { }

  ngOnInit() {
    // this.menuItems = ROUTES.filter(menuItem => menuItem);
  
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

logOut() {
  this.common.logOut();
};

  // getTitle(){
  //   var titlee = this.ocation.prepareExternalUrl(this.location.path());
  //   if(titlee.charAt(0) === '#'){
  //       titlee = titlee.slice( 1 );
  //   }

  //   for(var item = 0; item < this.listTitles.length; item++){
  //       if(this.listTitles[item].path === titlee){
  //           return this.listTitles[item].title;
  //       }
  //   }
  //   return 'Dashboard';
  // }

  // pageRedirect(page : any){
  //     this.pointToViewElement.emit(page);
  // }
}
