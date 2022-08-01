import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private router : Router
  ) { }


  setUserLogin(data : any){
    // console.log(data);
    var encId = data.shopid*693693;
    localStorage.setItem("adminpanellogin","1");
    localStorage.setItem("user",data.name);
    localStorage.setItem("email",data.emailid);
    localStorage.setItem("shop",encId.toString());
    // console.log(localStorage.getItem("shop"));
  }

  validUser(){
    if(localStorage.getItem("adminpanellogin") == null){
      // this.sidebarAction('close');
        return false;
    }else{
      // this.sidebarAction('open');
        return true;
    }
  }

  logOut(){
    // localStorage.clear();
    localStorage.removeItem("adminpanellogin");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("shop");
    this.router.navigate(["/login"]);
  }

    // Management Enable/Disable

    setActiveManagement = (param : any) =>{
      // this.managementEnable = false;
      const element = document.getElementById("sideNav");
      var children = element.childNodes;
      children.forEach(function(data:any) {
            if(data.classList.contains(param)){
                data.classList.add('active');
            }else{
                data.classList.remove('active');
            }
        // }
      })
    }
}
