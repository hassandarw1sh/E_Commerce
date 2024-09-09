import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl, url } from '../../../environment/environment.local';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
 myHeader:any={
  token:localStorage.getItem("token")
 }
  constructor() { }
private readonly _HttpClient=inject(HttpClient);

Checkout(id:string|null,dataBody:object):Observable <any> {
  return this._HttpClient.post(baseUrl+`api/v1/orders/checkout-session/${id}${url}`,{
   "shippingAddress":dataBody
  },{
    headers:this.myHeader
  }
)
  

}

}
