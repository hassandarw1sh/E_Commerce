import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../../environment/environment.local';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor() { }
  private readonly _HttpClient=inject(HttpClient)
  addProductWishList(id:any):Observable<any>{
    return this._HttpClient.post(baseUrl+"api/v1/wishlist",{
      
        "productId": id
    
    }
  )}
  getWishList():Observable<any>{
    return this._HttpClient.get(baseUrl+"api/v1/wishlist")
  
}
removeLove(id:string):Observable <any>{
  return this._HttpClient.delete(baseUrl+"api/v1/wishlist/"+id)
}
}
