import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// material 
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
// import { MatIcon } from "@angular/material/icon";
// import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatBadgeModule} from '@angular/material/badge';
import { MatCheckboxModule } from "@angular/material/checkbox";

import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from "@angular/material/divider";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatDialogModule,
    MatDividerModule,
    MatCheckboxModule,
    // CKEditorModule
  ],
  exports : [
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatDialogModule,
    MatDividerModule,
    MatCheckboxModule,
    // CKEditorModule
  ]
})
export class MaterialDesignForCreatedAdminModule { }
