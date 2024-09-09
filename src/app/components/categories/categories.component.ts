import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Category } from '../../shared/interface/category';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly _CategoriesService=inject(CategoriesService);
  private readonly _NgxSpinnerService=inject(NgxSpinnerService)
  Category:Category[]=[]
  ngOnInit(): void {
   this.getAllCategory()
 }


  getAllCategory(){
    this._NgxSpinnerService.show('Category')
    this._CategoriesService.getCategories().subscribe({
      next:(res)=>{
    this._NgxSpinnerService.hide('Category')

        console.log(res)
        this.Category=res.data
      }
    })
  }

}
