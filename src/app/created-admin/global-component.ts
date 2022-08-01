// import { Component, OnInit } from '@angular/core';
import { environment } from "../../environments/environment";
export class GlobalComponent {

    public static shop : Number = parseInt(localStorage.getItem("shop"))/693693;
    public static defaultImage : String = "00000000.gif";

    // localhost URL

    // public static baseUrl : String = "http://localhost/medcart/adminApi/";
    // public static imagePath : String = "http://localhost/medcart/images/";
    // public static defaultImagePath : String = "http://localhost/medcart/images/00000000.gif";
    // public static productImagePath : String = "http://localhost/medcart/images/product/";
    // public static categoryImagePath : String = "http://localhost/medcart/images/category/";
    // public static shopImagePath : String = "http://localhost/medcart/images/shop/";
    // public static shopImageLogoPath : String = "http://localhost/medcart/images/shop/logo/";
    // public static shopBackImagePath : String = "http://localhost/medcart/images/shop/backimage/";

    public static baseUrl : String = environment.baseUrl;

    public static imagePath : String = environment.imagePath;
    public static defaultImagePath : String = environment.defaultImagePath;
    public static productImagePath : String = environment.productImagePath;
    public static categoryImagePath : String = environment.categoryImagePath;
    public static shopImagePath : String = environment.shopImagePath;
    public static shopImageLogoPath : String = environment.shopImageLogoPath;
    public static shopBackImagePath : String = environment.shopBackImagePath;
    public static offerImagePath : String = environment.offerImagePath;

    public static offerTypeList : any = [
      {"id":1,"name":"Percentage %"},
      {"id":2,"name":"Fixed Discount"},
      {"id":3,"name":"Maximum Offer Quantity"},
    ];

    // Server URL

    // public static baseUrl : String = "https://geservetechnology.com/ref/medcart/api/adminApi/";

    // public static imagePath : String = "https://geservetechnology.com/ref/medcart/api/images/";
    // public static defaultImagePath : String = "https://geservetechnology.com/ref/medcart/api/images/00000000.gif";
    // public static productImagePath : String = "https://geservetechnology.com/ref/medcart/api/images/product/";
    // public static categoryImagePath : String = "https://geservetechnology.com/ref/medcart/api/images/category/";
    // public static shopImagePath : String = "https://geservetechnology.com/ref/medcart/api/images/shop/";
    // public static shopImageLogoPath : String = "https://geservetechnology.com/ref/medcart/api/images/shop/logo/";
    // public static shopBackImagePath : String = "https://geservetechnology.com/ref/medcart/api/images/shop/backimage/";

}

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/login', title: 'Login',  icon: 'pe-7s-home', class: '' },
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-home', class: '' },
    { path: '/user', title: 'User Acount Detail',  icon: 'pe-7s-home', class: '' },
    { path: '/productList', title: 'Product List',  icon:'pe-7s-news-paper', class: '' },
    { path: '/product', title: 'Product Add/Edit',  icon:'pe-7s-bell', class: '' },
    { path: '/categoryList', title: 'Category List',  icon:'pe-7s-plugin', class: '' },
    { path: '/category', title: 'Category Add/Edit',  icon:'pe-7s-bell', class: '' },
    // { path: '/shopList', title: 'Shop List',  icon:'pe-7s-box1', class: '' },
    // { path: '/shop', title: 'Shop Add/Edit',  icon:'pe-7s-bell', class: '' },
    { path: '/languageList', title: 'Language List',  icon:'pe-7s-global', class: '' },
    { path: '/language', title: 'Language Add/Edit',  icon:'pe-7s-bell', class: '' },
    { path: '/currencyList', title: 'Currency List',  icon:'pe-7s-global', class: '' },
    { path: '/currency', title: 'Currency Add/Edit',  icon:'pe-7s-bell', class: '' },
    { path: '/gstList', title: 'GST List',  icon:'pe-7s-global', class: '' },
    { path: '/gst', title: 'GST Add/Edit',  icon:'pe-7s-bell', class: '' },
    { path: '/offerList', title: 'Offer List',  icon:'pe-7s-global', class: '' },
    { path: '/offer', title: 'Offer Add/Edit',  icon:'pe-7s-bell', class: '' },
];
