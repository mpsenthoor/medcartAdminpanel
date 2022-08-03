import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreatedAdminRouts } from './created-admin.routing';

import { MaterialDesignForCreatedAdminModule } from "./material-design-for-created-admin/material-design-for-created-admin.module";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductAddEditComponent } from "./product-add-edit/product-add-edit.component";
import { CategoryListComponent } from "./category-list/category-list.component";
import { CategoryAddEditComponent } from "./category-add-edit/category-add-edit.component";
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopAddEditComponent } from './shop-add-edit/shop-add-edit.component';
import { LanguageListComponent } from './language-list/language-list.component';
import { LanguageAddEditComponent } from './language-add-edit/language-add-edit.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { CurrencyAddEditComponent } from './currency-add-edit/currency-add-edit.component';
import { DeleteConfirmationMessageComponent } from './delete-confirmation-message/delete-confirmation-message.component';
import { GstAddEditComponent } from './gst-add-edit/gst-add-edit.component';
import { GstListComponent } from './gst-list/gst-list.component';
import { LoginComponent } from './login/login.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferAddEditComponent } from './offer-add-edit/offer-add-edit.component';
import { CkEditerComponent } from './ck-editer/ck-editer.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAddEditComponent } from './customer-add-edit/customer-add-edit.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductAddEditComponent,
    CategoryListComponent,
    CategoryAddEditComponent,
    ShopListComponent,
    ShopAddEditComponent,
    LanguageListComponent,
    LanguageAddEditComponent,
    CurrencyListComponent,
    CurrencyAddEditComponent,

    DeleteConfirmationMessageComponent,
    
     GstAddEditComponent,
     GstListComponent,
     LoginComponent,
     OfferListComponent,
     OfferAddEditComponent,
     CkEditerComponent,
     CustomerListComponent,
     CustomerAddEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CreatedAdminRouts),
    MaterialDesignForCreatedAdminModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  // exports:[
  //   ProductListComponent,
  //   ProductAddEditComponent,
  //   CategoryListComponent,
  //   CategoryAddEditComponent,
  // ]
})
export class CreatedAdminModule { }
