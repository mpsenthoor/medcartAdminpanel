import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from "./global-component";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
// productUrl : any;
// categoryUrl : any;
  constructor(private http : HttpClient) {
    // this.productUrl = this.getProductUrl();
  }

  // baseUrl = "http://localhost/medcart/adminApi/";

  getUrl(url : any){
    return GlobalComponent.baseUrl+url+'/';
  }

  getProductUrl(){
    return this.getUrl("product.php");
  }

  getCategoryUrl(){
    return this.getUrl("category.php");
  }

  getShopUrl(){
    return this.getUrl("shop.php");
  }

  getLanguageUrl(){
    return this.getUrl("language.php");
  }

  getCurrencyUrl(){
    return this.getUrl("currency.php");
  }

  getGSTUrl(){
    return this.getUrl("gst.php");
  }

  getLoginUrl(){
    return this.getUrl("login.php");
  }

  getCustomerUrl(){
    return this.getUrl("customer.php");
  }

    // Offer API Start

    connectToOfferApi(data : FormData){
      var url = this.getUrl("offer.php"); 
      // console.log(url);
      return this.http.post(url,data);
    }
  
  // Offer API End

  // Product API Start

  connectToProductApi(data : FormData){
    return this.http.post(this.getProductUrl(),data);
  }

  // Product API End

  // Category API Start

  connectToCategoryApi(data : FormData){
    return this.http.post(this.getCategoryUrl(),data);
  }
   // Category API End


    // Shop API Start

    connectToShopApi(data : FormData){
      return this.http.post(this.getShopUrl(),data);
    }

   // Shop API End

  // Language API Start

     connectToLanguageApi(data : FormData){
      return this.http.post(this.getLanguageUrl(),data);
    }

  // Language API End

  // Currency API Start

     connectToCurrencyApi(data : FormData){
      return this.http.post(this.getCurrencyUrl(),data);
    }

  // Currency API End

    // GST API Start

    connectToGstApi(data : FormData){
      return this.http.post(this.getGSTUrl(),data);
    }

  // GST API End

  // Login API Start

    connectToLoginApi(data : FormData){
      return this.http.post(this.getLoginUrl(),data);
    }

  // Login API End

    // Customer API Start

    connectToCustomerApi(data : FormData){
      return this.http.post(this.getCustomerUrl(),data);
    }

  // Customer API End

}
