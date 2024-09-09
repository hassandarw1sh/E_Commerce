import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../../../environment/environment.local';

@Injectable({
  providedIn: 'root'
})
export class CartService {
isNumberOfCart:BehaviorSubject<number>=new BehaviorSubject(0)
  constructor() { }

  MyHeader:any={
    token:localStorage.getItem("token")
    
  }
  private _HttpClient= inject(HttpClient);
  addProduct(id:string ):Observable <any> {
    return this._HttpClient.post(baseUrl+"api/v1/cart",{
      "productId": id
    })
  }
  getCartProduct():Observable <any>{
    return this._HttpClient.get(baseUrl+"api/v1/cart")
  }
  removeProduct(id:string):Observable <any> {
   return this._HttpClient.delete(baseUrl+`api/v1/cart/${id}`)
    
  }
  removeAllProduct():Observable<any>{
    return this._HttpClient.delete(baseUrl+"api/v1/cart")

  }
  UpdateCartProductQuantity(id:string,newCount:number):Observable <any> {
    return this._HttpClient.put(baseUrl+`api/v1/cart/${id}`,{
       "count": newCount
    },)
     
   }
 


}
