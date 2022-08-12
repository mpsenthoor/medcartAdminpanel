import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControlName, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { GlobalComponent } from "../global-component";

import {formatDate} from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { DeleteConfirmationMessageComponent } from '../delete-confirmation-message/delete-confirmation-message.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../common.service';


// import {MatDialog, MatDialogRef} from '@angular/material/dialog';

// import { DeleteConfirmationMessageComponent } from "../delete-confirmation-message/delete-confirmation-message.component";
// import { Console } from 'console';
// import console = require('console');

export interface DialogData {
  delete : Boolean;
  no : Boolean;
  message : any;
}

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss']
})
export class ProductAddEditComponent implements OnInit {
  @Input() editorValue :any;

  constructor(
    private router : Router,
    private fb : FormBuilder,
    private http : HttpService,
    private dateAdapter: DateAdapter<Date>,
    public dialog : MatDialog,
    private common : CommonService
    ) {

      // console.log(this.editorValue);

      this.dateAdapter.setLocale('en-GB');
      this.productGroup = this.fb.group({
        // const productName = new FormControl
        productname : ['',Validators.required],
        productimage : [''],
        productprice : ['',Validators.required],
        productcategory : ['',Validators.required],
        productshop : [''],
        startDate : [''],
        endDate : [''],
        desc : [''],

        // productname : new FormControl('',[Validators.required]), 
        // productimage : new FormControl('',[Validators.required]),
        // productprice : new FormControl('',[Validators.required]),
        // productcategory : new FormControl('',[Validators.required]),
        // productshop : new FormControl('',[Validators.required]),
        // startDate : new FormControl('',[Validators.required]),
        // endDate : new FormControl('',[Validators.required])
      });
     }

      // const productName = new FormControl
      // productname = new FormControl('',[Validators.required]); 
      // productimage = new FormControl('',[Validators.required]);
      // productprice = new FormControl('',[Validators.required]);
      // productcategory = new FormControl('',[Validators.required]);
      // productshop = new FormControl('',[Validators.required]);
      // startDate = new FormControl('',[Validators.required]);
      // endDate = new FormControl('',[Validators.required]);

    noImage : any = GlobalComponent.defaultImagePath;
    imagePath : any = GlobalComponent.productImagePath;
    productGroup : FormGroup;
    categoryList : any;
    shopList : any;
    productImage : any;
    formType : any;
    editId : any;
    imageSrc : any;
    editImgSrc : any;
    fileAttr = "Choose File";

    productFormSubmitted : boolean = false;

    deleteConfirmation : Boolean;

    shop : any = GlobalComponent.shop;

    about : any;
    startDateForValidation : any;
  ngOnInit(): void {
    this.common.validUser();
    // console.log(history.state);
    this.common.setActiveManagement("product");
    this.onLoad();
    this.formType = history.state.action;
    if(history.state.action == 'edit'){
      this.setEditableData(history.state.id);
      this.editId = (history.state.id);
    }
  }

  setEditableData(id : any){
    var formData = new FormData();
    formData.append('action','getProduct');
    formData.append('product',id);

    this.http.connectToProductApi(formData).subscribe((resp : any) => {
      // console.log(resp);
      if(resp != null){
        this.editImgSrc = resp.image_url;
        this.editorValue = resp.about;
        // console.log(this.editorValue);
        if(resp.startdate != "0000-00-00"){
          this.productGroup.patchValue({
            startDate : resp.startdate
          })
        }
        if(resp.enddate != "0000-00-00"){
          this.productGroup.patchValue({
            endDate : resp.enddate
          })
        }

        this.productGroup.patchValue({
          productname : resp.name,
          // productimage : resp.image_url ,
          productprice : resp.price_ex,
          productcategory : resp.category_id,
          // productshop : resp.shop_id,
          // startDate : resp.startdate,
          // endDate : resp.enddate,
          desc : resp.desc_
        });
      }
    })
  }

  onLoad(){
    var formData = new FormData();

    formData.append("action","listOfCategoryForSelect");

    this.http.connectToCategoryApi(formData).subscribe((resp : any) => {
      // console.log(resp);
      this.categoryList = resp;
    })

    formData.append("action","getShopList");
    this.http.connectToShopApi(formData).subscribe((resp : any) => {
      this.shopList = resp;
    })

  }

  setShop(){
    this.productGroup.patchValue({
      productshop : this.productGroup.get['category'].value
    }) 
  }

//   readURL(event: Event): void {
//     if (event.target.files && event.target.files[0]) {
//         const file = event.target.files[0];

//         const reader = new FileReader();
//         reader.onload = e => this.imageSrc = reader.result;

//         reader.readAsDataURL(file);
//     }
// }

  readProductImage(event : any){
    // console.log(e.target.files);
    this.productImage = event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;

        reader.readAsDataURL(file);
      }
  }

  // onSubmit(){
  //   console.log(this.productGroup.value);
  // }


  updateDateFormat(date : any) {

    let val = formatDate(date,'yyyy/MM/dd','en');
    // console.log(val);
    return val;
  }

  // updateEndDate(event){
  //  let datVal = event.target.value;
  // // console.log("We are End date : "+datVal);
  //  let resp = this.updateDateFormat(datVal);
  //  this.productGroup.setValue({
  //   endDate : resp
  //  })
  //   // console.log(resp);
  // }

  // updateStartDate(event){
  //   let datVal = event.target.value;
  //   let resp = this.updateDateFormat(datVal);
  //   this.productGroup.setValue({
  //     startDate : resp
  //    })
  //   // console.log(resp);
  // }

  removeLocalImage(){
    this.imageSrc = '';
  }

  openDialog() : void{
    const dialogRef = this.dialog.open(DeleteConfirmationMessageComponent, {
      width: '250px',
      data: {delete : true,no : false,message: "Are you sure want to remove this Product Image?"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.deleteConfirmation = result;
      if(result){
        this.removeSavedImage();
      }
    });
  }

  removeSavedImage(){
    // if(confirm("Are you sure remove this product image?")){
      var formData = new FormData();
          formData.append("action","removeImage");
          formData.append("product",this.editId);
          formData.append("image",this.editImgSrc);
      this.http.connectToProductApi(formData).subscribe((resp : any) => {
          // console.log(resp);
          if(resp == 1){
            this.editImgSrc = '';
          }
      });
    // }
  }

  setCkEditorValue(data : any){
    this.about = data;
  }

  saveProduct(){
    this.productFormSubmitted = true;
    var formData = new FormData();
    console.log(this.about);
    // console.log(this.productGroup.value);
    if(this.productGroup.valid){
      if(this.formType == 'edit'){
        formData.append("action","updateProduct");
        formData.append('product',this.editId);
      }else{
        formData.append("action","addProduct");
      }
      formData.append("name",this.f.productname.value);
      formData.append("price",this.f.productprice.value);
      formData.append("category",this.f.productcategory.value);
      // formData.append("shop",this.f.productshop.value);
      formData.append("shop",this.shop);
      formData.append("image",this.productImage);
      formData.append("sdate", this.f.startDate.value != '' && this.f.startDate.value != null ? this.updateDateFormat(this.f.startDate.value) : '');
      formData.append("edate", this.f.endDate.value != '' && this.f.endDate.value != null ? this.updateDateFormat(this.f.endDate.value) : '');
      formData.append("desc",this.f.desc.value);
      formData.append("about",this.about != undefined ? this.about : '');

      this.http.connectToProductApi(formData).subscribe((resp : any) => {
        // console.log(resp);
        if(resp == '1'){
            this.router.navigate(['productList']);
        }
      });

      // console.log(this.f.productname.value);
      // console.log(this.productGroup.controls.productname.value);
    }else{

    }
    
  }

  get f(){
    return this.productGroup.controls;
  }

  rediectPage(){
    this.router.navigate(['productList']);
  }

}
