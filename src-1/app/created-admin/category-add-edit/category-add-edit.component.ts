import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControlName, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { GlobalComponent } from "../global-component";

import {formatDate} from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrls: ['./category-add-edit.component.scss']
})
export class CategoryAddEditComponent implements OnInit {

  constructor(
    private router : Router,
    private fb : FormBuilder,
    private http : HttpService,
    private dateAdapter: DateAdapter<Date>,
    // public dialog : MatDialog,,
    private common : CommonService
    ) {
      this.dateAdapter.setLocale('en-GB');
      this.categoryGroup = this.fb.group({
        // const categoryName = new FormControl
        categoryname : ['',Validators.required],
        categoryimage : [''],
        // categoryshop : ['',Validators.required],
        startDate : [''],
        endDate : [''],
      });
     }

    noImage : any = GlobalComponent.defaultImagePath;
    imagePath : any = GlobalComponent.categoryImagePath;
    categoryGroup : FormGroup;
    categoryList : any;
    shopList : any;
    categoryImage : any;
    formType : any;
    editId : any;
    imageSrc : any;
    editImgSrc : any;
    fileAttr = "Choose File";

    categoryFormSubmitted : boolean = false;

    shop : any = GlobalComponent.shop;

  ngOnInit(): void {
    this.common.validUser();
    this.common.setActiveManagement("category");
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
    formData.append('action','getCategory');
    formData.append('category',id);

    this.http.connectToCategoryApi(formData).subscribe((resp : any) => {
      // console.log(resp);
      this.editImgSrc = resp.image_url;
      this.categoryGroup.patchValue({
        categoryname : resp.desc_,
        // categoryimage : resp.image_url ,
        categoryshop : resp.shop_id,
        startDate : resp.start_date,
        endDate : resp.end_date,
      });
    })
  }

  onLoad(){
    var formData = new FormData();

    formData.append("action","getCategoryList");

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
    this.categoryGroup.patchValue({
      categoryshop : this.categoryGroup.get['category'].value
    }) 
  }

  readCategoryImage(event : any){
    // console.log(e.target.files);
    this.categoryImage = event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;

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

  removeSavedImage(){
    if(confirm("Are you sure remove this category image?")){
      var formData = new FormData();
          formData.append("action","removeImage");
          formData.append("category",this.editId);
          formData.append("image",this.editImgSrc);
      this.http.connectToCategoryApi(formData).subscribe((resp : any) => {
          // console.log(resp);
          if(resp == 1){
            this.editImgSrc = '';
          }
      });
    }
  }

  saveCategory(){
    this.categoryFormSubmitted = true;
    var formData = new FormData();
    // console.log(this.categoryGroup.value);
    if(this.categoryGroup.valid){
      if(this.formType == 'edit'){
        formData.append("action","updateCategory");
        formData.append('category',this.editId);
      }else{
        formData.append("action","addCategory");
      }
      formData.append("name",this.f.categoryname.value);
      // formData.append("price",this.f.categoryprice.value);
      // formData.append("category",this.f.categorycategory.value);
      formData.append("shop",this.shop);
      formData.append("image",this.categoryImage);
      formData.append("sdate", this.f.startDate.value != '' ? this.updateDateFormat(this.f.startDate.value) : '');
      formData.append("edate", this.f.endDate.value != '' ? this.updateDateFormat(this.f.endDate.value) : '');
      // formData.append("desc",this.f.desc.value);

      this.http.connectToCategoryApi(formData).subscribe((resp : any) => {
        console.log(resp);
        if(resp == '1'){
            this.router.navigate(['categoryList']);
        }
      });

      // console.log(this.f.categoryname.value);
      // console.log(this.categoryGroup.controls.categoryname.value);
    }else{

    }
    
  }

  get f(){
    return this.categoryGroup.controls;
  }

  rediectPage(){
    this.router.navigate(['categoryList']);
  }

}
