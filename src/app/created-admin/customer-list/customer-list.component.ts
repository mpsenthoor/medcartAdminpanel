import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerAddEditComponent } from '../customer-add-edit/customer-add-edit.component';

export interface customerElement{
 
  image_url: String;
  sze : number;
  name: String;
  customer_id: String;
  trend : string;
}


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})


export class CustomerListComponent implements OnInit {

  constructor(
    // private router : Router,
    public dialog : MatDialog,
  ) { }

  ngOnInit(): void {
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
