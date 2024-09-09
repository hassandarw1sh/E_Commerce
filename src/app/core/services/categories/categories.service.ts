import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../../environment/environment.local';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }
  private _HttpClient=inject(HttpClient)
  getCategories():Observable<any>{
    return this._HttpClient.get(baseUrl+"api/v1/categories")
  }

  getBrands():Observable<any>{
    return this._HttpClient.get(baseUrl+"api/v1/brands")
  }

}
