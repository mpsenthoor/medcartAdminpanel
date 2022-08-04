import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
// import "../assets/css/bootstrap.min.css";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

     constructor(public location: Location) {
      if(sessionStorage.getItem('user')){
        this.validUser = true;
      }else{
        this.validUser = false;
      }
     }

    ngOnInit(){
      window.onpopstate = function (e) { window.history.forward(); }
    }

    validUser : Boolean;

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
}
