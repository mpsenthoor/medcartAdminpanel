import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControlName, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { GlobalComponent } from "../global-component";

import {formatDate} from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-gst-add-edit',
  templateUrl: './gst-add-edit.component.html',
  styleUrls: ['./gst-add-edit.component.scss']
})
export class GstAddEditComponent implements OnInit {

  constructor(
    private router : Router,
    private fb : FormBuilder,
    private http : HttpService,
    private dateAdapter: DateAdapter<Date>,
    // public dialog : MatDialog,
    private common : CommonService
    ) {
      this.dateAdapter.setLocale('en-GB');
      this.gstGroup = this.fb.group({
        // const gstName = new FormControl
        gstamount : ['',Validators.required],
        gstdesc : [''],
        currencyId : ['',Validators.required],
        shopId : ['',Validators.required],
      });
     }

    gstGroup : FormGroup;
    shopList : any;
    currencyList : any;
    formType : any;
    editId : any;

    gstFormSubmitted : boolean = false;

    shop : any = GlobalComponent.shop;

  ngOnInit(): void {
    this.common.validUser();
    this.common.setActiveManagement("gst");
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
    formData.append('action','getGst');
    formData.append('gst',id);

    this.http.connectToGstApi(formData).subscribe((resp : any) => {
      // console.log(resp);
      this.gstGroup.patchValue({
        gstdesc : resp.desc_,
        gstamount : resp.gst_amount,
        shopId : resp.shop_id,
        currencyId : resp.currency_id,
      });
    })
  }

  onLoad(){
    var formData = new FormData();

    formData.append("action","getShopList");
    this.http.connectToShopApi(formData).subscribe((resp : any) => {
      this.shopList = resp;
    })

    formData.append("action","ListOfCurrency");
    this.http.connectToCurrencyApi(formData).subscribe((resp : any) => {
      this.currencyList = resp;
    })

  }

  saveGst(){
    this.gstFormSubmitted = true;
    var formData = new FormData();
    // console.log(this.gstGroup.value);
    if(this.gstGroup.valid){
      if(this.formType == 'edit'){
        formData.append("action","updateGst");
        formData.append('gst',this.editId);
      }else{
        formData.append("action","addGst");
      }
      formData.append("amount",this.f.gstamount.value);
      formData.append("desc",this.f.gstdesc.value);
      // formData.append("shop",this.f.shopId.value);
      formData.append("shop",this.shop);
      formData.append("currency",this.f.currencyId.value);

      this.http.connectToGstApi(formData).subscribe((resp : any) => {
        // console.log(resp);
        if(resp == '1'){
            this.router.navigate(['gstList']);
        }
      });

      // console.log(this.f.gstname.value);
      // console.log(this.gstGroup.controls.gstname.value);
    }else{

    }
    
  }

  get f(){
    return this.gstGroup.controls;
  }

  rediectPage(){
    this.router.navigate(['gstList']);
  }

}
