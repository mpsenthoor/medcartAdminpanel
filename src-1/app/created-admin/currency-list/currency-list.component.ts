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
  // shop : String;
  name : String;
  symbol : String;
  action : String;
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
  //   currency_id: "25",
  // }
];

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit {

  displayedColumns: string[] = ['sze','name','symbol','action'];
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
    this.common.setActiveManagement("currency");
    this.onLoad();
    // this.dataSource = this.dataSource;
  }
  // data: any = [];

  currencyList : any;
  defaultImage = GlobalComponent.defaultImagePath;
  deleteConfirmation : Boolean;

    dataAvail : Boolean = true;

  onLoad(){
    var formData = new FormData();
    formData.append("action","ListOfCurrency");
    this.http.connectToCurrencyApi(formData).subscribe((resp : any) => {
      // console.log(resp);
      this.currencyList = resp;
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
  openDialog(id : any) : void{
    const dialogRef = this.dialog.open(DeleteConfirmationMessageComponent, {
      width: '250px',
      data: {delete : true,no : false,message: "Are you sure want to remove this GST data?"},
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      this.deleteConfirmation = result;
      if(result){
        this.deleteCurrency(id);
      }
    });
  }
  // deleteCurrency(row_obj,id : any,deleteId : any){
    deleteCurrency(id : any){
    var formData = new FormData();
    // if(confirm("Are you sure remove this currency?")){
      formData.append("action","deleteCurrency");
      formData.append("currency",id);

      this.http.connectToCurrencyApi(formData).subscribe((resp : any) => {
        // console.log(resp);
        if(resp != '0'){
          this.dataSource.data = resp;
          this.currencyList = resp;
          if(resp.length == 0){
            this.dataAvail = false;
          }
        }
      });
    // }
  }

  changeToAddEditPage(type : any,editId : any){
    this.router.navigate(['currency'],{state : {action : type,id : editId}});
  }

}
