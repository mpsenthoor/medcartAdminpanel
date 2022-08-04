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
  image_url: String;
  sze : number;
  name: String;
  contact : number;
  customer_id: String;
}

const ELEMENT_DATA: PeriodicElement[] = [
  // { row : 1,
  //   image_url: "11056226.png",
  //   name: "Test",
  //   customer_id: "25",
  // }
];


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})


export class CustomerListComponent implements OnInit {

  displayedColumns: string[] = ['sze','name','contact','image_url','customer_id'];
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
    this.common.setActiveManagement("customer");
    this.onLoad();
  }

  
  customerList : any;
  imagePath = GlobalComponent.customerImagePath;
  defaultImg = GlobalComponent.defaultImagePath;
  
  deleteConfirmation : Boolean;

  dataAvail : Boolean = true;

  onLoad(){
    var formData = new FormData();
    formData.append("action","customerList");
    this.http.connectToCustomerApi(formData).subscribe((resp : any) => {
      // console.log(resp);
      this.customerList = resp;
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

  setTrendEnableDisable(e : any,customer : any){
    // console.log(e);
    // console.log(customer);
    var formData = new FormData();
    formData.append("action","trendUpdate");
    formData.append("customer",customer);
    if(e){
      formData.append("trend",'1');
    }else{
      formData.append("trend","0");
    }

    this.http.connectToCustomerApi(formData).subscribe((resp : any) => {
      if(resp != 0){
        this.dataSource.data = resp;
        this.customerList = resp;
      }
      // console.log(resp);
    });
  }

  openDialog(id : any) : void{
    const dialogRef = this.dialog.open(DeleteConfirmationMessageComponent, {
      width: '250px',
      data: {delete : true,no : false,message: "Are you sure want to remove this Customer?"},
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      this.deleteConfirmation = result;
      if(result){
        this.deleteCustomer(id);
      }
    });
  }

  deleteCustomer(id : any){
  // deleteCustomer(row_obj,id : any,deleteId : any){
    var formData = new FormData();
    // const dialogRef =  this.dialog.open(DeleteConfirmationMessageComponent,{
    //     width : '300px',
    //   })
    // if(dialogRef.afterClosed().subscribe(result => {
    //   return result;
    // })){
    // if(confirm("Are you sure remove this customer?")){
      formData.append("action","deleteCustomer");
      formData.append("customer",id);

      this.http.connectToCustomerApi(formData).subscribe((resp : any) => {
        if(resp.length == 0){
          this.dataAvail = false;
        }
        if(resp != '0'){
          this.dataSource.data = resp;
          this.customerList = resp;
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
    this.router.navigate(['customer'],{state : {action : type,id : editId}});
  }


//   changeToAddEditPage(type:any, editId:any){
// this.router.navigate(['customer'],{state:{action:type, id: editId}})
//   }

  // openDialog() {
  //   this.dialog.open(CustomerAddEditComponent, {
  //     width:"250px"
  //   });
  // }

}
