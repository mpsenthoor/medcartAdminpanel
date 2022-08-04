import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControlName, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { GlobalComponent } from "../global-component";

import {formatDate} from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-currency-add-edit',
  templateUrl: './currency-add-edit.component.html',
  styleUrls: ['./currency-add-edit.component.scss']
})
export class CurrencyAddEditComponent implements OnInit {

  constructor(
    private router : Router,
    private fb : FormBuilder,
    private http : HttpService,
    private dateAdapter: DateAdapter<Date>,
    // public dialog : MatDialog,
    private common : CommonService
    ) {
      this.dateAdapter.setLocale('en-GB');
      this.currencyGroup = this.fb.group({
        // const currencyName = new FormControl
        currencyname : ['',Validators.required],
        currencysymbol : ['',Validators.required],
        // shopId : ['',Validators.required],
      });
     }

    currencyGroup : FormGroup;
    shopList : any;
    formType : any;
    editId : any;

    currencyFormSubmitted : boolean = false;

  ngOnInit(): void {
    this.common.validUser();
    this.common.setActiveManagement("currency");
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
    formData.append('action','getCurrency');
    formData.append('currency',id);

    this.http.connectToCurrencyApi(formData).subscribe((resp : any) => {
      // console.log(resp);
      this.currencyGroup.patchValue({
        currencyname : resp.desc_,
        currencysymbol : resp.symbol,
        // shopId : resp.shopid,
      });
    })
  }

  onLoad(){
    var formData = new FormData();

    formData.append("action","getShopList");
    this.http.connectToShopApi(formData).subscribe((resp : any) => {
      this.shopList = resp;
    })

  }

  saveCurrency(){
    this.currencyFormSubmitted = true;
    var formData = new FormData();
    // console.log(this.currencyGroup.value);
    if(this.currencyGroup.valid){
      if(this.formType == 'edit'){
        formData.append("action","updateCurrency");
        formData.append('currency',this.editId);
      }else{
        formData.append("action","addCurrency");
      }
      formData.append("name",this.f.currencyname.value);
      formData.append("symbol",this.f.currencysymbol.value);
      // formData.append("symbol",this.f.currencysymbol.value);

      this.http.connectToCurrencyApi(formData).subscribe((resp : any) => {
        // console.log(resp);
        if(resp == '1'){
            this.router.navigate(['currencyList']);
        }
      });

      // console.log(this.f.currencyname.value);
      // console.log(this.currencyGroup.controls.currencyname.value);
    }else{

    }
    
  }

  get f(){
    return this.currencyGroup.controls;
  }

  rediectPage(){
    this.router.navigate(['currencyList']);
  }

}
