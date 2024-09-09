import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class MytranslateService {
 private readonly _TranslateService=inject(TranslateService);
 private readonly _PLATFORM_ID=inject(PLATFORM_ID);
 
  constructor() { 
    if(isPlatformBrowser(this._PLATFORM_ID)){


      let saveLang=  localStorage.getItem("lang");
      // any webSite has language if local storage does't have default language must web site has language => fallback 
      this._TranslateService.setDefaultLang('en');
      if(localStorage.getItem("lang")!==null){

        this._TranslateService.use(saveLang!);
      }
      // change direction of your website 
      this.changeDirection();

    }

  
  }

  changeDirection():void{

    let saveLang=  localStorage.getItem("lang");


    if(saveLang=='en'){
      document.documentElement.dir='ltr'
    }
    if(saveLang=='ar'){
      document.documentElement.dir='rtl'
    }

  }
  change(lang:string){
    
    if(isPlatformBrowser(this._PLATFORM_ID)){

    localStorage.setItem("lang",lang)
    this._TranslateService.use(lang)
    this.changeDirection()
  }}
}
