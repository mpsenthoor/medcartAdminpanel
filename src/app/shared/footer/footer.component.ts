import { Component } from '@angular/core';

declare var $:any;

@Component({
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html'
})

export class FooterComponent{
    test : Date = new Date();
    constructor(){
        // if(sessionStorage.getItem("user")){
        //     this.validUser = true;
        //   }else{
        //     this.validUser = false;
        //   }
    }

    // validUser : Boolean;
}
