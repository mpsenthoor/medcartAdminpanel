import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup : FormGroup;

  constructor(
    private router : Router,
    private fb : FormBuilder,
    private http : HttpService,
    private common : CommonService
  ) { 
    this.loginFormGroup = this.fb.group({
      loginEmail : ['',[Validators.required,Validators.email]],
      loginPass : ['',Validators.required]
    })
  }

  ngOnInit(): void {
    // if(localStorage.length > 0){
    //   this.router.navigate(['/dashboard']);
    // }else{
      this.sidebarAction("close");
    // }    
  }

  loginFormSubmitted = false;
  
  errorMessage : Boolean = false;

  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
};

  sidebarAction(action : any) {
    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      // const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
      const sideBarElem = <HTMLElement>document.querySelector('.sidebar');
      const headderElem = <HTMLElement>document.querySelector('navbar-cmp');
      const footerElem = <HTMLElement>document.querySelector('footer-cmp');
      const body = <HTMLElement>document.getElementsByTagName('body')[0];

      if(action == 'close'){
        // console.log();
        body.classList.remove('nav-open');
        elemMainPanel.style.width = "100%";
        
        sideBarElem.style.display = "none";
        headderElem.style.display = "none";
        footerElem.style.display = "none";
      }else{
        elemMainPanel.style.width = "";
        sideBarElem.style.display = "block";
        headderElem.style.display = "block";
        footerElem.style.display = "block";
      }
  };

  doLogin(){
    this.loginFormSubmitted = true;
    // console.log(this.loginFormGroup.value);
    if(this.loginFormGroup.valid){
      var formData = new FormData();
      formData.append("action","getShopUser");
      formData.append("email",this.f.loginEmail.value);
      formData.append("pass",this.f.loginPass.value);

      this.http.connectToLoginApi(formData).subscribe((resp : any) => {
        // console.log(resp);
        if(resp == null){
            this.errorMessage = true;
        }else{
          this.sidebarAction("open");
          this.router.navigate(['/dashboard']);
          this.common.setUserLogin(resp);
        }
      })
    }

  }

  get f(){
    return this.loginFormGroup.controls;
  }

}
