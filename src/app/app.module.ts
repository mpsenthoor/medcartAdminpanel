import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// import { BackButtonDisableModule } from 'angular-disable-browser-back-button'

// import "../assets/css/bootstrap.min.css";
// import { MatButtonModule } from "@angular/material";
// import '~bootstrap/dist/css/bootstrap.css';
// import { Material } from "@angular/material";

// import { MatTableDataSource } from "@angular/material/table";
// import { MatButtonModule } from "@angular/material/button";
// import { MatTooltipModule } from "@angular/material/tooltip";
// import { MatFormFieldModule } from "@angular/material/form-field";
// import { MatInputModule } from "@angular/material/input";
// import { MatRippleModule } from '@angular/material/core';
// import {  } from "@angular/material/";

import { MaterialDesignForCreatedAdminModule } from "./created-admin/material-design-for-created-admin/material-design-for-created-admin.module";
// import { CreatedAdminModule } from "./created-admin/created-admin.module";
import { AppRoutingModule } from './app.routing';

import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CustomerAddEditComponent } from './created-admin/customer-add-edit/customer-add-edit.component';

// Editer Module

// import { CKEditorModule } from "@ckeditor/ckeditor5-angular";

// import { DeleteConfirmationMessageComponent } from './delete-confirmation-message/delete-confirmation-message.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    MaterialDesignForCreatedAdminModule,
    // BackButtonDisableModule.forRoot({
    //   preserveScrollPosition: true
    // }),
    // CreatedAdminModule,
    AppRoutingModule,
    NgbModule,
    // CKEditorModule
    MatDialogModule,
    MatFormFieldModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  
    
    // CreatedAdminModule
    // DeleteConfirmationMessageComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


