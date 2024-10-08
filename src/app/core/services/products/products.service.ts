import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../../environment/environment.local';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 

  constructor(private _HttpClient:HttpClient) { }
  getProducts(pageTWo:string): Observable<any>{
    return this._HttpClient.get(baseUrl+"api/v1/products"+pageTWo)
  }
  getProductDetails(id:string|null):Observable <any>{
   
  return this._HttpClient.get(`${baseUrl}api/v1/products/${id}`) 
  }

  
}
