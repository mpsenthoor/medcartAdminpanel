import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SidebarModule } from '../../sidebar/sidebar.module';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

// import { AdminLayoutRoutes } from './admin-layout.routing';
import { CreatedAdminRouts } from "../../created-admin/created-admin.routing";

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
// import { ProductListComponent } from '../../created-admin/product-list/product-list.component';
// import { ProductAddEditComponent } from "../../created-admin/product-add-edit/product-add-edit.component";

// import {MatDialog, MatDialogRef} from '@angular/material/dialog';

// import { DeleteConfirmationMessageComponent } from '../../created-admin/delete-confirmation-message/delete-confirmation-message.component';

import { CreatedAdminModule } from "../../created-admin/created-admin.module";
import { MatDividerModule } from '@angular/material/divider';



// material 
// import { MatRippleModule } from '@angular/material/core';
// import { MatButtonModule } from "@angular/material/button";
// import { MatIconModule } from "@angular/material/icon";
// import { MatTableModule } from "@angular/material/table";
// import { MatTableDataSource } from "@angular/material/table";
// // import { MatButtonModule } from "@angular/material/button";
// import { MatTooltipModule } from "@angular/material/tooltip";
// import { MatFormFieldModule } from "@angular/material/form-field";
// import { MatInputModule } from "@angular/material/input";
// import { MatSelectModule } from '@angular/material/select';
// import { MatDatepickerModule } from "@angular/material/datepicker";
// import { MatToolbarModule } from "@angular/material/toolbar";
// import { MatPaginatorModule } from "@angular/material/paginator";

// import { MatNativeDateModule } from '@angular/material/core';
// import {  } from "@angular/material/";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CreatedAdminRouts),
    FormsModule,
    ReactiveFormsModule,
    LbdModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'}),
    CreatedAdminModule,
    MatDividerModule,
    
    // MatButtonModule,
    // MatTooltipModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatTableModule,
    // MatButtonModule,
    // MatIconModule,
    // MatRippleModule,
    // MatSelectModule,
    // MatDatepickerModule,
    // MatToolbarModule,
    // MatNativeDateModule,
    // MatPaginatorModule
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    
    // ProductListComponent,
    // ProductAddEditComponent,
    // DeleteConfirmationMessageComponent
  ]
})

export class AdminLayoutModule {}


