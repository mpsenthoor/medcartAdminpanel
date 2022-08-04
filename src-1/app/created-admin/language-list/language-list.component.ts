import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

import { GlobalComponent } from "../global-component";

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DeleteConfirmationMessageComponent } from '../delete-confirmation-message/delete-confirmation-message.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../common.service';

export interface PeriodicElement {
  sze : number;
  name: String;
  action: String;
}

export interface DialogData {
  delete : Boolean;
  no : Boolean;
  message : any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  // { row : 1,
  //   image_url: "11056226.png",
  //   name: "Test",
  //   language_id: "25",
  // }
];

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.scss']
})
export class LanguageListComponent implements OnInit {

  displayedColumns: string[] = ['sze','name','action'];
  // dataSource : any = [];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(
    private router : Router,
    private http : HttpService,
    public dialog : MatDialog,
    private common : CommonService
    ) { }

  ngOnInit(): void {
    this.common.validUser();
    this.common.setActiveManagement("language");
    this.onLoad();
    // this.dataSource = this.dataSource;
  }
  // data: any = [];

  languageList : any;
  defaultImage = GlobalComponent.defaultImagePath;
  deleteConfirmation : boolean;

    dataAvail : Boolean = true;

  openDialog(id : any) : void{
    const dialogRef = this.dialog.open(DeleteConfirmationMessageComponent, {
      width: '250px',
      data: {delete : true,no : false,message: "Are you sure want to remove this language?"},
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      this.deleteConfirmation = result;
      if(result){
        this.deleteLanguage(id);
      }
    });
  }

  onLoad(){
    var formData = new FormData();
    formData.append("action","ListOfLanguage");
    this.http.connectToLanguageApi(formData).subscribe((resp : any) => {
      // console.log(resp);
      this.languageList = resp;
      // this.dataSource = resp;
      this.dataSource.data = resp;
      if(resp.length == 0){
        this.dataAvail = false;
      }
      // console.log(this.dataSource);
      // console.log(this.dataSource.data);
      // const dataSource = new MatTableDataSource<PeriodicElement>(resp);
    })
  }
  updateDataSource(index : any) {
    // this.dataSource.splice(index,1);
  }
  // deleteLanguage(row_obj,id : any,deleteId : any){
  deleteLanguage(id : any){
    // this.openDialog();
      var formData = new FormData();
      if(this.deleteConfirmation){
        formData.append("action","deleteLanguage");
        formData.append("language",id);

        this.http.connectToLanguageApi(formData).subscribe((resp : any) => {
          // console.log(resp);
          if(resp != '0'){
            this.dataSource.data = resp;
            this.languageList = resp;
            if(resp.length == 0){
              this.dataAvail = false;
            }
          }
        });
      }
  }

  changeToAddEditPage(type : any,editId : any){
    this.router.navigate(['language'],{state : {action : type,id : editId}});
  }

}

