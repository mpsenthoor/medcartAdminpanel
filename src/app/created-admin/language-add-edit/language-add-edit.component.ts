import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControlName, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { GlobalComponent } from "../global-component";

import {formatDate} from '@angular/common';
import { DateAdapter } from '@angular/material/core';
// import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-language-add-edit',
  templateUrl: './language-add-edit.component.html',
  styleUrls: ['./language-add-edit.component.scss']
})
export class LanguageAddEditComponent implements OnInit {

  constructor(
    private router : Router,
    private fb : FormBuilder,
    private http : HttpService,
    private dateAdapter: DateAdapter<Date>,
    // private dialog : MatDialog,
    private common : CommonService
    ) {
      this.dateAdapter.setLocale('en-GB');
      this.languageGroup = this.fb.group({
        // const languageName = new FormControl
        languagename : ['',Validators.required],
      });
     }

    languageGroup : FormGroup;
    languageList : any;
    formType : any;
    editId : any;

    languageFormSubmitted : boolean = false;

  ngOnInit(): void {
    // console.log(history.state);
    this.common.validUser();
    this.common.setActiveManagement("language");
    this.formType = history.state.action;
    if(history.state.action == 'edit'){
      this.setEditableData(history.state.id);
      this.editId = (history.state.id);
    }
  }

  setEditableData(id : any){
    var formData = new FormData();
    formData.append('action','getLanguage');
    formData.append('language',id);

    this.http.connectToLanguageApi(formData).subscribe((resp : any) => {
      // console.log(resp);
      this.languageGroup.patchValue({
        languagename : resp.desc_,
      });
    })
  }



  saveLanguage(){
    this.languageFormSubmitted = true;
    var formData = new FormData();
    // console.log(this.languageGroup.value);
    if(this.languageGroup.valid){
      if(this.formType == 'edit'){
        formData.append("action","updateLanguage");
        formData.append('language',this.editId);
      }else{
        formData.append("action","addLanguage");
      }
      formData.append("name",this.f.languagename.value);
      // formData.append("desc",this.f.desc.value);

      this.http.connectToLanguageApi(formData).subscribe((resp : any) => {
        // console.log(resp);
        if(resp == '1'){
            this.router.navigate(['languageList']);
        }
      });

      // console.log(this.f.languagename.value);
      // console.log(this.languageGroup.controls.languagename.value);
    }else{

    }
    
  }

  get f(){
    return this.languageGroup.controls;
  }

  rediectPage(){
    this.router.navigate(['languageList']);
  }

}
