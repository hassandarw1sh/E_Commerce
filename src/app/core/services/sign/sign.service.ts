import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../../../environment/environment.local';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignService {
  private _Router=inject(Router)
  private decode=null
  constructor() { }
  private _HttpClient=inject(HttpClient)
  signup (data:any) : Observable<any>{
    return this._HttpClient.post(baseUrl+'api/v1/auth/signup',data)
  }
  signIn (datain:any) : Observable<any>{
    return this._HttpClient.post(baseUrl+'api/v1/auth/signin',datain)
  }
  UserData=()=>{
    let data:any = localStorage.getItem('token');
    if (data!==null){
      try{
         this.decode=jwtDecode(data);
 console.log(this.decode);

      }catch(error){
        // console.log('error in jwt decode',error);
this._Router.navigate(['/signin'])
        localStorage.clear()
      }
      
    }
  }
  logOut=():void=>{
    localStorage.removeItem('token')
    this._Router.navigate(['/signin'])
    this.decode=null

    
  }
forgetPasswordEmail(email:any):Observable<any>{
  return this._HttpClient.post(baseUrl+"api/v1/auth/forgotPasswords",email)

}

forgetPasswordCode(code:any):Observable <any>{
  return this._HttpClient.post(baseUrl+"api/v1/auth/verifyResetCode",code)
}
newPassword(NEwPassword:any):Observable <any>{
  return this._HttpClient.put(baseUrl+"api/v1/auth/resetPassword",NEwPassword)
}
}
