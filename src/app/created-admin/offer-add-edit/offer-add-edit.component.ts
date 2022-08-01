import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControlName, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { GlobalComponent } from "../global-component";

import {formatDate, NgSwitch} from '@angular/common';
import { DateAdapter } from '@angular/material/core';
// import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-offer-add-edit',
  templateUrl: './offer-add-edit.component.html',
  styleUrls: ['./offer-add-edit.component.scss']
})
export class OfferAddEditComponent implements OnInit {


  constructor(
    private router : Router,
    private fb : FormBuilder,
    private http : HttpService,
    private dateAdapter: DateAdapter<Date>,
    // private dialog : MatDialog,
    private common : CommonService
    ) {
      this.dateAdapter.setLocale('en-GB');
      this.offerGroup = this.fb.group({
        // const offerName = new FormControl
        offername : ['',Validators.required],
        offerproduct : ["",Validators.required],
        offertype : ["",Validators.required],
        offerpercentage : [""],
        offerfixeddiscount : [""],
        offerfreequantity : [""]
      });
     }

    offerGroup : FormGroup;
    offerList : any;
    formType : any;
    editId : any;
    productList : any;

    offerFormSubmitted : boolean = false;

    offerTypEnbl : any;
    typeList : any = GlobalComponent.offerTypeList;

  ngOnInit(): void {
    // console.log(history.state);
    this.common.validUser();
    this.common.setActiveManagement("offer");
    this.formType = history.state.action;

    this.onLoad();
  }

  onLoad(){
    this.getProductList();

    if(history.state.action == "edit"){
      this.editId = history.state.id;
      this.setEditableData(this.editId);
    }

    // this.typeList = ;

  }

  setOfferType(e){
    // console.log(e.value);
    this.offerTypEnbl = e.value;
  }

  getProductList(){
    var formData : any = new FormData();
    formData.append("action","ListOfProductFilterByShop");
    formData.append("shop",parseInt(localStorage.getItem('shop')));
    this.http.connectToProductApi(formData).subscribe((resp : any) => {
      // console.log(resp);
      if(resp != null){
        this.productList = resp;
      }
    });
  }

  setEditableData(id : any){
    var formData = new FormData();
    formData.append('action','getOffer');
    formData.append('offer',id);

    this.http.connectToOfferApi(formData).subscribe((resp : any) => {
      // console.log(resp);
      localStorage.setItem("offerData",resp);
        if(resp != null){
        this.offerGroup.patchValue({
          offername : resp.offer_name,
          offerproduct : resp.product_ids,
          offertype : parseInt(resp.offer_type),
          offerpercentage : resp.percentage,
          offerfixeddiscount : resp.fixed_discount,
          offerfreequantity : resp.max_free_qty
        });
        this.offerTypEnbl = resp.offer_type;
      }
    })
  };



  saveOffer(){
    this.offerFormSubmitted = true;
    var formData = new FormData();
    // console.log(this.offerGroup.value);
    if(this.offerGroup.valid && (this.f.offerpercentage.value != '' || this.f.offerfixeddiscount.value != '' || this.f.offerfreequantity.value != '')){
      switch (this.offerTypEnbl) {
        case 1:
          this.f.offerfixeddiscount.setValue('');
          this.f.offerfreequantity.setValue('');
          break;
        case 2:
         this.f.offerpercentage.setValue('');
         this.f.offerfreequantity.setValue('');
          break;
        case 3:
          this.f.offerpercentage.setValue('');
          this.f.offerfixeddiscount.setValue('');
          break;
      }
      // console.log(this.offerGroup.value);
      if(this.formType == 'edit'){
        formData.append("action","updateOffer");
        formData.append('offer',this.editId);
      }else{
        formData.append("action","addOffer");
      }
      formData.append("name",this.f.offername.value);
      formData.append("product",this.f.offerproduct.value);
      formData.append("type",this.f.offertype.value);
      formData.append("pers",this.f.offerpercentage.value);
      formData.append("fixed",this.f.offerfixeddiscount.value);
      formData.append("qty",this.f.offerfreequantity.value);

      this.http.connectToOfferApi(formData).subscribe((resp : any) => {
        // console.log(resp);
        if(resp == '1'){
            this.router.navigate(['offerList']);
        }
      });

      // console.log(this.f.offername.value);
      // console.log(this.offerGroup.controls.offername.value);
    }else{

    }
    
  }

  get f(){
    return this.offerGroup.controls;
  }

  rediectPage(){
    this.router.navigate(['offerList']);
  }

}
