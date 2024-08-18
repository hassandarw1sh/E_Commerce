import { Routes } from '@angular/router';
import { AuthlayoutsComponent } from './layouts/authlayouts/authlayouts.component';
import { SinginComponent } from './components/singin/singin.component';
import { SingupComponent } from './components/singup/singup.component';
import { MainlayoutsComponent } from './layouts/mainlayouts/mainlayouts.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';

export const routes: Routes = [
    {path: '' ,redirectTo: '',pathMatch: 'full',},
    {path: '', component:AuthlayoutsComponent,children:[
       
        {path: '', redirectTo: 'signIn',pathMatch:"full"},
       
        {path:"signIn",component:SinginComponent,title:"signIn"},
        {path:"signUp",component:SingupComponent,title:"signUp"},
   
        
        
    ]},

    {path: '', component:MainlayoutsComponent,children:[
        {path: '', redirectTo: 'home',pathMatch:"full"},

        {path:"home",component:HomeComponent,title:"home"},
        {path:"cart",component:CartComponent,title:"cart"},
        {path:"products",component:ProductComponent,title:"products"},
        {path:"bards",component:BrandsComponent,title:"bards"},
        {path:"category",component:CategoriesComponent,title:"category"},
        
        
    ]}
];
