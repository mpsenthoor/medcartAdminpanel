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
  sze : number;
  backimage: String;
  logimag : String;
  name: String;
  mobile : String;
  address : String;
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
  //   shop_id: "25",
  // }
];

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {
  displayedColumns: string[] = ['sze','name','address','mobile','backimage','logimag','action'];
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
    this.common.setActiveManagement("shop");
    this.onLoad();
    // this.dataSource = this.dataSource;
    this.isMobileMenu();
  }

//   setActiveManagement = (param : any) =>{
//     // this.managementEnable = false;
//     const element = document.getElementById("sideNav");
//     var children = element.childNodes;
//     children.forEach(function(data:any) {
//         console.log(data.classList.contains(param));
//         // $(this).attr('class');
//         // if(data.classList.contains(param)){
//         //     console.log(data.classList);
//         //         data.classList.add('active');
//         // }else{
//         //     data.classList.remove('active');
//         // }
//     })
// }
  // data: any = [];

  shopList : any;
  imagePath = GlobalComponent.shopImagePath;
  backImagePath = GlobalComponent.shopBackImagePath;
  logoImagePath = GlobalComponent.shopImageLogoPath;
  defaultImage = GlobalComponent.defaultImagePath;

  deleteConfirmation : Boolean;

    dataAvail : boolean = true;
  
  isMobileMenu() {
      if ($(window).width() < 991) {
        this.displayedColumns = ['sze','name','mobile','backimage','action'];
          return false;
      }
      return true;
  };

  onLoad(){
    var formData = new FormData();
    formData.append("action","listOfShop");
    this.http.connectToShopApi(formData).subscribe((resp : any) => {
      // console.log(resp);
      this.shopList = resp;
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
      data: {delete : true,no : false,message: "Are you sure want to remove this Shop?"},
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      this.deleteConfirmation = result;
      if(result){
        this.deleteShop(id);
      }
    });
  }

  deleteShop(id : any){
  // deleteShop(row_obj,id : any,deleteId : any){
    var formData = new FormData();
    // const dialogRef =  this.dialog.open(DeleteConfirmationMessageComponent,{
    //     width : '300px',
    //   })
    // if(dialogRef.afterClosed().subscribe(result => {
    //   return result;
    // })){
    // if(confirm("Are you sure remove this shop?")){
      formData.append("action","deleteShop");
      formData.append("shop",id);

      this.http.connectToShopApi(formData).subscribe((resp : any) => {
        if(resp != '0'){
          this.dataSource.data = resp;
          this.shopList = resp;
          if(resp.length == 0){
            this.dataAvail = false;
          }
        }
      });
    // }
  }

  changeToAddEditPage(type : any,editId : any){
// console.log(editId);
    this.router.navigate(['shop'],{state : {action : type,id : editId}});
  }

}
