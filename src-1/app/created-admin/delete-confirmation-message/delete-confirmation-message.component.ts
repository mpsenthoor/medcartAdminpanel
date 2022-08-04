import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData, LanguageListComponent } from '../language-list/language-list.component';

@Component({
  selector: 'app-delete-confirmation-message',
  templateUrl: './delete-confirmation-message.component.html',
  styleUrls: ['./delete-confirmation-message.component.scss']
})
export class DeleteConfirmationMessageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LanguageListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    
   }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // cancel(){
  //   return false;
  // }

  // delete(){
  //   return true;
  // }

}
