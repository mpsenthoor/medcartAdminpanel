import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { UserComponent } from '../user/user.component';
import { TablesComponent } from '../tables/tables.component';
import { TypographyComponent } from '../typography/typography.component';
import { IconsComponent } from '../icons/icons.component';
import { MapsComponent } from '../maps/maps.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { UpgradeComponent } from '../upgrade/upgrade.component';

import { ProductListComponent } from "../created-admin/product-list/product-list.component";
import { ProductAddEditComponent } from "../created-admin/product-add-edit/product-add-edit.component";
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryAddEditComponent } from './category-add-edit/category-add-edit.component';
import { ShopListComponent } from "./shop-list/shop-list.component";
import { ShopAddEditComponent } from "./shop-add-edit/shop-add-edit.component";
import { LanguageAddEditComponent } from './language-add-edit/language-add-edit.component';
import { LanguageListComponent } from './language-list/language-list.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { CurrencyAddEditComponent } from './currency-add-edit/currency-add-edit.component';
import { GstListComponent } from './gst-list/gst-list.component';
import { GstAddEditComponent } from './gst-add-edit/gst-add-edit.component';
import { LoginComponent } from './login/login.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferAddEditComponent } from './offer-add-edit/offer-add-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAddEditComponent } from './customer-add-edit/customer-add-edit.component';

export const CreatedAdminRouts: Routes = [
    { path: 'login',                component: LoginComponent },
    { path: 'dashboard',            component: HomeComponent },
    { path: 'user',                 component: UserComponent },
    // { path: 'table',             component: TablesComponent },
    // { path: 'typography',        component: TypographyComponent },
    // { path: 'icons',             component: IconsComponent },
    // { path: 'maps',              component: MapsComponent },
    // { path: 'notifications',     component: NotificationsComponent },
    // { path: 'upgrade',           component: UpgradeComponent },
    { path: 'productList',          component: ProductListComponent },
    { path: 'product',              component: ProductAddEditComponent },
    { path: 'categoryList',         component: CategoryListComponent },
    { path: 'category',             component: CategoryAddEditComponent },
    { path: 'shopList',             component: ShopListComponent},
    { path: 'shop',                 component: ShopAddEditComponent},
    { path: 'languageList',         component: LanguageListComponent},
    { path: 'language',             component: LanguageAddEditComponent},
    { path: 'currencyList',         component: CurrencyListComponent},
    { path: 'currency',             component: CurrencyAddEditComponent},
    { path: 'gstList',              component: GstListComponent},
    { path: 'gst',                  component: GstAddEditComponent},
    { path: 'offerList',            component: OfferListComponent},
    { path: 'offer',                component: OfferAddEditComponent},
    { path: 'customerList',         component: CustomerListComponent},
    { path: 'customer',             component: CustomerAddEditComponent}


];
