import { Component, OnInit} from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';
import { filter, Subscription } from 'rxjs';
import { CommonService } from 'app/created-admin/common.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
    viewPage;
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(
    public location: Location,
    private router: Router,
    private common : CommonService
    ) {
    // window.location.hash = "no-back-button";
    // noBack();
    // if(sessionStorage.getItem("user")){
    //     this.validUser = true;
    //   }else{
    //     this.validUser = false;
    //   }
}

// validUser : Boolean;

  ngOnInit() {
    this.common.validUser();
    // console.log(this.router)
      const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

      if (isWindows) {
          // if we are on windows OS we activate the perfectScrollbar function

          document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
      } else {
          document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
      }
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
    //   const sideBarElem = <HTMLElement>document.querySelector('.sidebar');
    //   const headderElem = <HTMLElement>document.querySelector('navbar-cmp');
    //   const footerElem = <HTMLElement>document.querySelector('footer-cmp');

    //   if(!this.isLogin()){
    //     elemMainPanel.style.width = "100%";
        
    //     sideBarElem.style.display = "none";
    //     headderElem.style.display = "none";
    //     footerElem.style.display = "none";
    //   }else{
    //     elemMainPanel.style.width = "80%";
    //     sideBarElem.style.display = "block";
    //     headderElem.style.display = "block";
    //     footerElem.style.display = "block";
    //   }

      this.location.subscribe((ev:PopStateEvent) => {
          this.lastPoppedUrl = ev.url;
      });
       this.router.events.subscribe((event:any) => {
          if (event instanceof NavigationStart) {
             if (event.url != this.lastPoppedUrl)
                 this.yScrollStack.push(window.scrollY);
         } else if (event instanceof NavigationEnd) {
             if (event.url == this.lastPoppedUrl) {
                 this.lastPoppedUrl = undefined;
                 window.scrollTo(0, this.yScrollStack.pop());
             } else
                 window.scrollTo(0, 0);
         }
      });
      this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
           elemMainPanel.scrollTop = 0;
           elemSidebar.scrollTop = 0;
      });
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
          let ps = new PerfectScrollbar(elemMainPanel);
          ps = new PerfectScrollbar(elemSidebar);
      }
  }
  ngAfterViewInit() {
      this.runOnRouteChange();
  }
  isMap(path){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.slice( 1 );
      if(path == titlee){
          return false;
      }
      else {
          return true;
      }
  }

//   isLogin(){
//     var titlee = this.location.prepareExternalUrl(this.location.path());
//     titlee = titlee.slice( 1 );
//     console.log(titlee);
//     if("/login" == titlee){
//         return false;
//     }
//     else {
//         return true;
//     }
// }

  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const ps = new PerfectScrollbar(elemMainPanel);
      ps.update();
    }
  }
  isMac(): boolean {
      let bool = false;
      if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
          bool = true;
      }
      return bool;
  }

}
