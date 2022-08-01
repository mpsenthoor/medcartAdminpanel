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
  category_id: String;
}

const ELEMENT_DATA: PeriodicElement[] = [
  // { row : 1,
  //   image_url: "11056226.png",
  //   name: "Test",
  //   category_id: "25",
  // }
];

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = ['sze','name','image_url','category_id'];
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
    this.common.setActiveManagement("category");
    this.onLoad();
  }

  
  categoryList : any;
  imagePath = GlobalComponent.categoryImagePath;
  
  deleteConfirmation : Boolean;

  dataAvail : Boolean = true;

  onLoad(){
    var formData = new FormData();
    formData.append("action","ListOfCategory");
    this.http.connectToCategoryApi(formData).subscribe((resp : any) => {
      // console.log(resp);
      this.categoryList = resp;
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

  setTrendEnableDisable(e : any,category : any){
    // console.log(e);
    // console.log(category);
    var formData = new FormData();
    formData.append("action","trendUpdate");
    formData.append("category",category);
    if(e){
      formData.append("trend",'1');
    }else{
      formData.append("trend","0");
    }

    this.http.connectToCategoryApi(formData).subscribe((resp : any) => {
      if(resp != 0){
        this.dataSource.data = resp;
        this.categoryList = resp;
      }
      // console.log(resp);
    });
  }

  openDialog(id : any) : void{
    const dialogRef = this.dialog.open(DeleteConfirmationMessageComponent, {
      width: '250px',
      data: {delete : true,no : false,message: "Are you sure want to remove this Category?"},
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      this.deleteConfirmation = result;
      if(result){
        this.deleteCategory(id);
      }
    });
  }

  deleteCategory(id : any){
  // deleteCategory(row_obj,id : any,deleteId : any){
    var formData = new FormData();
    // const dialogRef =  this.dialog.open(DeleteConfirmationMessageComponent,{
    //     width : '300px',
    //   })
    // if(dialogRef.afterClosed().subscribe(result => {
    //   return result;
    // })){
    // if(confirm("Are you sure remove this category?")){
      formData.append("action","deleteCategory");
      formData.append("category",id);

      this.http.connectToCategoryApi(formData).subscribe((resp : any) => {
        if(resp.length == 0){
          this.dataAvail = false;
        }
        if(resp != '0'){
          this.dataSource.data = resp;
          this.categoryList = resp;
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
    this.router.navigate(['category'],{state : {action : type,id : editId}});
  }

}
