import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControlName, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { GlobalComponent } from "../global-component";

import {formatDate} from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { DeleteConfirmationMessageComponent } from '../delete-confirmation-message/delete-confirmation-message.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-shop-add-edit',
  templateUrl: './shop-add-edit.component.html',
  styleUrls: ['./shop-add-edit.component.scss']
})
export class ShopAddEditComponent implements OnInit {

  constructor(
    private router : Router,
    private fb : FormBuilder,
    private http : HttpService,
    private dateAdapter: DateAdapter<Date>,
    public dialog : MatDialog,
    private common : CommonService
    ) {

      this.dateAdapter.setLocale('en-GB');
      this.shopGroup = this.fb.group({
        // const shopName = new FormControl
        shopname : ['',Validators.required],
        address : ['',Validators.required],
        city : ['',Validators.required],
        pincode : ['',Validators.required],
        state : ['',Validators.required],
        country : ['',Validators.required],
        phone : [''],
        mobile : ['',Validators.required],
        fax : [''],
        emailid : ['',[Validators.required,Validators.email]],
        webid : [''],
        reportmail : ['',Validators.email],
        reportmailpass : [''],
        desc : [''],
        extDesc : [''],
        backimage : [''],
        logoimage : [''],
        // bgColor : ['',Validators.required],
        txtColor : ['',Validators.required],
        // login : ['',Validators.required],
        // pass : ['',Validators.required],
        language : ['',Validators.required],
        currency : ['',Validators.required],
      });
     }

    noImage : any = GlobalComponent.defaultImagePath;
    imagePath : any = GlobalComponent.shopImagePath;
    backImagePath :any = GlobalComponent.shopBackImagePath;
    logoImagePath : any = GlobalComponent.shopImageLogoPath;
    shopGroup : FormGroup;
    categoryList : any;
    shopList : any;
    
    formType : any;
    editId : any;
    imageSrc : any = '';
    logoImageSrc : any = '';
    editImgSrc : any = '';
    editLogoSrc : any = '';
    shopImage : any;
    shopLogoImage : any;
    languageList : any = [];
    currencyList : any = [];

    // txtColr : any;

    shopFormSubmitted : boolean = false;

    deleteConfirmationImage : Boolean;
    deleteConfirmationLogo : Boolean;
    errorMessage : Boolean = false;

  ngOnInit(): void {
    // console.log(history.state);
    this.common.validUser();
    this.common.setActiveManagement("shop");
    this.getLanguageList();
    this.getCurrencyList();
    this.formType = history.state.action;
    if(history.state.action == 'edit'){
      // console.log(history.state.id);
      this.setEditableData(history.state.id);
      this.editId = (history.state.id);
    }

    
  }

//   getColor(event){
// this.txtColr = event.target.value;
//   }

  setEditableData(id : any){
    var formData = new FormData();
    formData.append('action','getShop');
    formData.append('shop',id);

    this.http.connectToShopApi(formData).subscribe((resp : any) => {
      // console.log(resp);
      this.editImgSrc = resp.backimage_url;
      this.editLogoSrc = resp.logo_url;
      this.editId = resp.shopid;

      this.shopGroup.patchValue({
        shopname : resp.name,
        address : resp.address,
        city : resp.city ,
        pincode : resp.postcode ,
        state : resp.state ,
        country : resp.country ,
        phone : resp.phone,
        mobile : resp.mobile ,
        fax : resp.fax ,
        emailid : resp.emailid ,
        webid : resp.website ,
        reportmail : resp.report_gmail_id ,
        reportmailpass : resp.report_gmail_pass ,
        desc : resp.desc_ ,
        extDesc : resp.ext_desc ,
        txtColor : resp.text_color ,
        language : resp.language_id ,
        currency : resp.currency_id ,

        // shopname : (resp.name != null ? resp.name : ''),
        // address : (resp.address != null ? resp.address : '') ,
        // city : (resp.city != null ? resp.city : '') ,
        // pincode : (resp.postcode != '' ? resp.postcode : '') ,
        // state : (resp.state != null ? resp.state : '') ,
        // country : (resp.country != null ? resp.country : '') ,
        // phone : (resp.phone != null ? resp.phone : ''),
        // mobile : (resp.mobile != null ? resp.mobile : '') ,
        // fax : (resp.fax != null ? resp.fax : '') ,
        // emailid : (resp.emailid != null ? resp.emailid : '') ,
        // webid : (resp.website != null ? resp.website : '') ,
        // reportmail : (resp.report_gmail_id != null ? resp.report_gmail_id : '') ,
        // reportmailpass : (resp.report_gmail_pass != null ? resp.report_gmail_pass : '') ,
        // desc : (resp.desc_ != null ? resp.desc_ : '') ,
        // extDesc : (resp.ext_desc != null ? resp.ext_desc : '') ,
        // txtColor : (resp.text_color != null ? resp.text_color : '') ,
        // language : (resp.language_id != null ? resp.language_id : '') ,
        // currency : (resp.currency_id != null ? resp.currency_id : '') ,

        // shopimage : resp.image_url ,
      });
    })
  }

  getLanguageList(){
    var formData = new FormData();
    formData.append("action","ListOfLanguage");
    this.http.connectToLanguageApi(formData).subscribe((resp : any) => {
        this.languageList = resp;
    })
  }

  getCurrencyList(){
    var formData = new FormData();
    formData.append("action","ListOfCurrency");
    this.http.connectToCurrencyApi(formData).subscribe((resp : any) => {
        this.currencyList = resp;
    })
  }

  readShopImage(event : any){
    // console.log(e.target.files);
    this.shopImage = event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;

        reader.readAsDataURL(file);
      }
  }

  readShopLogoImage(event : any){
    // console.log(e.target.files);
    this.shopLogoImage = event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.logoImageSrc = reader.result;

        reader.readAsDataURL(file);
      }
  }


  updateDateFormat(date : any) {

    let val = formatDate(date,'yyyy/MM/dd','en');
    // console.log(val);
    return val;
  }

  removeLocalImage(){
    this.imageSrc = '';
  }

  removeLocalLogo(){
    this.logoImageSrc = '';
  }

  openDialogRemoveImage() : void{
    const dialogRef = this.dialog.open(DeleteConfirmationMessageComponent, {
      width: '250px',
      data: {delete : true,no : false,message: "Are you sure want to remove this Background Image?"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.deleteConfirmationLogo = result;
      if(result){
        this.removeSavedLogoImage();
      }
    });
  }

  removeSavedImage(){
    if(confirm("Are you sure remove this shop image?")){
      var formData = new FormData();
          formData.append("action","removeBackImage");
          formData.append("shop",this.editId);
          formData.append("image",this.editImgSrc);
      this.http.connectToShopApi(formData).subscribe((resp : any) => {
          // console.log(resp);
          if(resp == 1){
            this.editImgSrc = '';
          }else{
            this.errorMessage = true;
          }
      });
    }
  }

  openDialogRemoveLogo() : void{
    const dialogRef = this.dialog.open(DeleteConfirmationMessageComponent, {
      width: '250px',
      data: {delete : true,no : false,message: "Are you sure want to remove this Logo Image?"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.deleteConfirmationLogo = result;
      if(result){
        this.removeSavedLogoImage();
      }
    });
  }

  removeSavedLogoImage(){
    // if(confirm("Are you sure remove this logo?")){
      var formData = new FormData();
          formData.append("action","removeLogoImage");
          formData.append("shop",this.editId);
          formData.append("logo",this.editLogoSrc);
      this.http.connectToShopApi(formData).subscribe((resp : any) => {
          // console.log(resp);
          if(resp == 1){
            this.editLogoSrc = '';
          }else{
            this.errorMessage = true;
          }
      });
    // }
  }

  saveShop(){
    this.shopFormSubmitted = true;
    var formData = new FormData();
    // console.log(this.shopGroup);
    console.log(this.shopGroup.value);
    if(this.shopGroup.valid){
      if(this.formType == 'edit'){
        formData.append("action","updateShop");
        formData.append('shop',this.editId);
      }else{
        formData.append("action","addShop");
      }
      formData.append("name",this.f.shopname.value);
      // formData.append("price",this.f.shopprice.value);
      // formData.append("shop",this.f.shopshop.value);

      // shopname : ['',Validators.required],
      //   address : ['',Validators.required],
      //   city : ['',Validators.required],
      //   pincode : ['',Validators.required],
      //   state : ['',Validators.required],
      //   country : ['',Validators.required],
      //   phone : ['',Validators.required],
      //   mobile : ['',Validators.required],
      //   fax : ['',Validators.required],
      //   emailid : ['',[Validators.required,Validators.email]],
      //   webid : ['',Validators.required],
      //   reportmail : ['',[Validators.required,Validators.email]],
      //   reportmailpass : ['',Validators.required],
      //   desc : [''],
      //   extDesc : [''],
      //   backimage : [''],
      //   logoimage : [''],
      //   txtColor : ['',Validators.required],
      //   language : ['',Validators.required],
      //   currency : ['',Validators.required],

      formData.append("shopname",this.f.shopname.value);
      formData.append("address",this.f.address.value);
      formData.append("city",this.f.city.value);
      formData.append("pincode",this.f.pincode.value);
      formData.append("state",this.f.state.value);
      formData.append("country",this.f.country.value);
      formData.append("phone",this.f.phone.value);
      formData.append("mobile",this.f.mobile.value);
      formData.append("fax",this.f.fax.value);
      formData.append("emailid",this.f.emailid.value);
      formData.append("webid",this.f.webid.value);
      formData.append("reportmail",this.f.reportmail.value);
      formData.append("reportmailpass",this.f.reportmailpass.value);
      formData.append("desc",this.f.desc.value);
      formData.append("extDesc",this.f.extDesc.value);
      formData.append("txtColor",this.f.txtColor.value);
      formData.append("language",this.f.language.value);
      formData.append("currency",this.f.currency.value);
      formData.append("backImage",this.shopImage);
      formData.append("logoImage",this.shopLogoImage);
      // formData.append("desc",this.f.desc.value);

      this.http.connectToShopApi(formData).subscribe((resp : any) => {
        console.log(resp);
        if(resp == '1'){
            this.router.navigate(['shopList']);
        }else{
          this.errorMessage = true;
        }
      });

      // console.log(this.f.shopname.value);
      // console.log(this.shopGroup.controls.shopname.value);
    }else{

    }
    
  }

  get f(){
    return this.shopGroup.controls;
  }

  rediectPage(){
    this.router.navigate(['shopList']);
  }

}
