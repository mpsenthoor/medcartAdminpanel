import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

import { GlobalComponent } from "../global-component";

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationMessageComponent } from '../delete-confirmation-message/delete-confirmation-message.component';
import { CommonService } from '../common.service';

export interface PeriodicElement {
  offer : String;
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
  //   offer_id: "25",
  // }
];

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {


  
  displayedColumns: string[] = ['sze','name','offer','action'];
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
    this.common.setActiveManagement("offer");
    this.onLoad();
    // this.dataSource = this.dataSource;
  }
  // data: any = [];

  offerList : any;
  imagePath = GlobalComponent.offerImagePath;
  defaultImage = GlobalComponent.defaultImagePath;

  deleteConfirmation : Boolean;

  dataAvail : Boolean = true;
  

  onLoad(){
    var formData = new FormData();
    formData.append("action","ListOfOffer");
    this.http.connectToOfferApi(formData).subscribe((resp : any) => {
      // console.log(resp);
      this.offerList = resp;
      // this.dataSource = resp;
      this.dataSource.data = resp;
      if(resp === null){
        this.dataAvail = false;
      }
      // console.log(this.dataSource);
      // console.log(this.dataSource.data);
      // const dataSource = new MatTableDataSource<PeriodicElement>(resp);
    })
  }

  percentageCheck(param : any){
    // param.includes("%") ? return true : return false;
      if(param.contains("%")){
        return true;
      }else{
        return false;
      }
  }
  
  updateDataSource(index : any) {
    // this.dataSource.splice(index,1);
  }

  openDialog(id : any) : void{
    const dialogRef = this.dialog.open(DeleteConfirmationMessageComponent, {
      width: '250px',
      data: {delete : true,no : false,message: "Are you sure want to remove this offer?"},
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      this.deleteConfirmation = result;
      if(result){
        this.deleteoffer(id);
      }
    });
  }

  // deleteoffer(row_obj,id : any,deleteId : any){
  deleteoffer(id : any){
    var formData = new FormData();
    // const dialogRef =  this.dialog.open(DeleteConfirmationMessageComponent,{
    //     width : '300px',
    //   })
    // if(dialogRef.afterClosed().subscribe(result => {
    //   return result;
    // })){
    // if(confirm("Are you sure remove this offer?")){
      formData.append("action","deleteOffer");
      formData.append("offer",id);

      this.http.connectToOfferApi(formData).subscribe((resp : any) => {
        if(resp != '0'){
          this.dataSource.data = resp;
          this.offerList = resp;
          if(resp === null){
            this.dataAvail = false;
          }
          // console.log(this.dataSource);
          // this.updateDataSource(deleteId);
          // this.dataSource.splice(deleteId,1);
          // this.dataSource.data = this.data;
          // removeRow (id) {
          //   this.dataSource = this.dataSource.filter((u) => u.id !== id);
          // }
          // row_obj.subscribe((res : any) => {
          //   let filterData = res.data;
          //   this.dataSource = this.dataSource.filter((value,key)=>{
          //     return value.id != filterData.id;
          //   });
          // })
          
            // e.parentNode.removeChild('.row');
            // var elem = document.getElementById(deleteId);
            // elem.parentNode.removeChild(elem);
        }
      });
    // }
  }

  changeToAddEditPage(type : any,editId : any){
    this.router.navigate(['offer'],{state : {action : type,id : editId}});
  }

}
