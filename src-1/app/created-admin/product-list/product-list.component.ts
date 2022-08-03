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
  product_id: String;
  trend : string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  // { row : 1,
  //   image_url: "11056226.png",
  //   name: "Test",
  //   product_id: "25",
  // }
];

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  
  displayedColumns: string[] = ['sze','name','image_url','trend','product_id'];
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
    this.common.setActiveManagement("product");
    this.onLoad();
    // this.dataSource = this.dataSource;
  }
  // data: any = [];

  productList : any;
  imagePath = GlobalComponent.productImagePath;
  
  deleteConfirmation : Boolean;

  dataAvail : Boolean = true;

  onLoad(){
    var formData = new FormData();
    formData.append("action","ListOfProduct");
    this.http.connectToProductApi(formData).subscribe((resp : any) => {
      // console.log(resp);
      this.productList = resp;
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

  setTrendEnableDisable(e : any,product : any){
    // console.log(e);
    // console.log(product);
    var formData = new FormData();
    formData.append("action","trendUpdate");
    formData.append("product",product);
    if(e){
      formData.append("trend",'1');
    }else{
      formData.append("trend","0");
    }

    this.http.connectToProductApi(formData).subscribe((resp : any) => {
      if(resp != 0){
        this.dataSource.data = resp;
        this.productList = resp;
      }
      // console.log(resp);
    });
  }

  openDialog(id : any) : void{
    const dialogRef = this.dialog.open(DeleteConfirmationMessageComponent, {
      width: '250px',
      data: {delete : true,no : false,message: "Are you sure want to remove this Product?"},
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      this.deleteConfirmation = result;
      if(result){
        this.deleteProduct(id);
      }
    });
  }

  deleteProduct(id : any){
  // deleteProduct(row_obj,id : any,deleteId : any){
    var formData = new FormData();
    // const dialogRef =  this.dialog.open(DeleteConfirmationMessageComponent,{
    //     width : '300px',
    //   })
    // if(dialogRef.afterClosed().subscribe(result => {
    //   return result;
    // })){
    // if(confirm("Are you sure remove this product?")){
      formData.append("action","deleteProduct");
      formData.append("product",id);

      this.http.connectToProductApi(formData).subscribe((resp : any) => {
        if(resp.length == 0){
          this.dataAvail = false;
        }
        if(resp != '0'){
          this.dataSource.data = resp;
          this.productList = resp;
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
    this.router.navigate(['product'],{state : {action : type,id : editId}});
  }

}

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   image: string;
//   // symbol: string;
// }