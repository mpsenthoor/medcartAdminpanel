import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControlName, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { GlobalComponent } from "../global-component";

import {formatDate} from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { CommonService } from '../common.service';

import { DeleteConfirmationMessageComponent } from '../delete-confirmation-message/delete-confirmation-message.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-add-edit',
  templateUrl: './customer-add-edit.component.html',
  styleUrls: ['./customer-add-edit.component.scss']
})
export class CustomerAddEditComponent implements OnInit {

  constructor(
    private router : Router,
    private fb : FormBuilder,
    private http : HttpService,
    private dateAdapter: DateAdapter<Date>,
    public dialog : MatDialog,
    // public dialog : MatDialog,,
    private common : CommonService
    ) {
      this.dateAdapter.setLocale('en-GB');
      this.customerGroup = this.fb.group({
        // const customerName = new FormControl
        firstname : ['',Validators.required],
        lastname : [''],
        customerimage : [''],
        email : ['',[Validators.email,Validators.required]],
        // customershop : ['',Validators.required],
        contact : ['',Validators.required],
        pass : ['',Validators.required],
      });
     }

    noImage : any = GlobalComponent.defaultImagePath;
    imagePath : any = GlobalComponent.customerImagePath;
    customerGroup : FormGroup;
    customerList : any;
    shopList : any;
    customerImage : any;
    formType : any;
    editId : any;
    imageSrc : any;
    editImgSrc : any;
    fileAttr = "Choose File";

    customerFormSubmitted : boolean = false;

    shop : any = GlobalComponent.shop;

    deleteConfirmation : boolean;

  ngOnInit(): void {
    this.common.validUser();
    this.common.setActiveManagement("customer");
    // console.log(history.state);
    this.onLoad();
    this.formType = history.state.action;
    if(history.state.action == 'edit'){
      this.setEditableData(history.state.id);
      this.editId = (history.state.id);
    }
  }

  setEditableData(id : any){
    var formData = new FormData();
    formData.append('action','getCustomer');
    formData.append('customer',id);

    this.http.connectToCustomerApi(formData).subscribe((resp : any) => {
      // console.log(resp);
      this.editImgSrc = resp.image_url;
      this.customerGroup.patchValue({
        firstname : resp.firstname,
        lastname : resp.lastname,
        // customerimage : resp.image_url ,
        contact : resp.mobile,
        email : resp.email_id,
        pass : resp.password,
      });
    })
  }

  onLoad(){
    var formData = new FormData();

    formData.append("action","getCustomerList");

    this.http.connectToCustomerApi(formData).subscribe((resp : any) => {
      // console.log(resp);
      this.customerList = resp;
    })

    formData.append("action","getShopList");
    this.http.connectToShopApi(formData).subscribe((resp : any) => {
      this.shopList = resp;
    })

  }

  readCustomerImage(event : any){
    // console.log(e.target.files);
    this.customerImage = event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;

        reader.readAsDataURL(file);
      }
  }


  removeLocalImage(){
    this.imageSrc = '';
  }

  openDialog() : void{
    const dialogRef = this.dialog.open(DeleteConfirmationMessageComponent, {
      width: '250px',
      data: {delete : true,no : false,message: "Are you sure want to remove this Customer Image?"},
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      this.deleteConfirmation = result;
      if(result){
        this.removeSavedImage();
      }
    });
  }

  removeSavedImage(){
    // if(confirm("Are you sure remove this customer image?")){
      var formData = new FormData();
          formData.append("action","removeImage");
          formData.append("customer",this.editId);
          formData.append("image",this.editImgSrc);
      this.http.connectToCustomerApi(formData).subscribe((resp : any) => {
          // console.log(resp);
          if(resp == 1){
            this.editImgSrc = '';
          }
      });
    // }
  }

  saveCustomer(){
    this.customerFormSubmitted = true;
    var formData = new FormData();
    // console.log(this.customerGroup);
    if(this.customerGroup.valid){
      if(this.formType == 'edit'){
        formData.append("action","updateCustomer");
        formData.append('customer',this.editId);
      }else{
        formData.append("action","addCustomer");
      }
      formData.append("firstname",this.f.firstname.value);
      // formData.append("price",this.f.customerprice.value);
      // formData.append("customer",this.f.customercustomer.value);
      formData.append("lastname",this.f.lastname.value);
      formData.append("image",this.customerImage);
      formData.append("email", this.f.email.value);
      formData.append("pass", this.f.pass.value);
      formData.append("contact",this.f.contact.value);

      this.http.connectToCustomerApi(formData).subscribe((resp : any) => {
        // console.log(resp);
        if(resp == '1'){
            this.router.navigate(['customerList']);
        }
      });

      // console.log(this.f.customername.value);
      // console.log(this.customerGroup.controls.customername.value);
    }else{

    }
    
  }

  get f(){
    return this.customerGroup.controls;
  }

  rediectPage(){
    this.router.navigate(['customerList']);
  }

}
