import { Component, OnInit, ElementRef } from '@angular/core';
// import { ROUTES } from '../../sidebar/sidebar.component';
import { ROUTES } from "../../created-admin/global-component";
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { CommonService } from 'app/created-admin/common.service';

@Component({
    // moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(
        location: Location, 
        private element: ElementRef,
        private common : CommonService
        ) {
      this.location = location;
        this.sidebarVisible = true;
        //   if(sessionStorage.getItem("user")){
        //     this.validUser = true;
        //   }else{
        //     this.validUser = false;
        //   }
    }

    validUser : Boolean;
    login : Boolean = true;
    user : any;
    // managementEnable : Boolean = true;
    ngOnInit(){
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

      this.user = localStorage.getItem("user");
    //   this.setSelectedManagement();
    }

    logOut(){
        this.common.logOut();
    }

    // setSelectedManagement = () =>{
    //     var page = this.location.prepareExternalUrl(this.location.path());
    //   if(page.charAt(0) === '#'){
    //     page = page.slice( 2 );
    //   }
    //     if(page == "shopList" || page == "shop"){
    //         const shopElem = <HTMLElement>document.getElementById("shop");
    //         shopElem.classList.add('active');
    //     }
    //     else if(page == "productList" || ){
    //         const shopElem = <HTMLElement>document.getElementById("product");
    //         shopElem.classList.add('active');
    //     }
        
    // }



    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
    //   if(this.managementEnable){
    //     this.setActiveManagement(titlee.slice( 2 ));
    //   }
      
// console.log(titlee.slice( 2 ));
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }      

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }
}
