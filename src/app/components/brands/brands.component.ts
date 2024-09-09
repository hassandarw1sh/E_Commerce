import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../shared/interface/category';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  private readonly _CategoriesService=inject(CategoriesService);
  private readonly _NgxSpinnerService=inject(NgxSpinnerService)

  brands:Category[]=[]
  ngOnInit(): void {
    this.getAllBrands()
  }
  getAllBrands(){
    this._NgxSpinnerService.show('brands')

    this._CategoriesService.getBrands().subscribe({

      next:(res)=>{
    this._NgxSpinnerService.hide('brands')
      
        console.log(res)
        this.brands=res.data
      }
    })
  }

}
