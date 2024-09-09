import { Routes } from '@angular/router';
import { AuthlayoutsComponent } from './layouts/authlayouts/authlayouts.component';
import { MainlayoutsComponent } from './layouts/mainlayouts/mainlayouts.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NotfoundpageComponent } from './components/notfoundpage/notfoundpage.component';
import { authGuard } from './core/guards/auth.guard';
import { mainGuard } from './core/guards/main.guard';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { OrderComponent } from './components/order/order.component';
import { WishListComponent } from './components/wish-list/wish-list.component';

export const routes: Routes = [
    // {path: '' ,redirectTo: '',pathMatch: 'full'},
    {path: '', component:AuthlayoutsComponent,canActivate:[mainGuard],children:[
       
        {path: '', redirectTo: 'signin',pathMatch:"full"},
       
        {path:"signin",component:SigninComponent,title:"signIn"},
        {path:"signup",component:SignupComponent,title:"signUp"},
        {path:"forget",component:ForgetpasswordComponent,title:"forget"},
   
        
        
    ]},

    {path: '', component:MainlayoutsComponent,canActivate:[authGuard],children:[
        {path: '', redirectTo: 'home',pathMatch:"full",title:"home"},

        {path:"home",component:HomeComponent,title:"home"},
        {path:"cart",component:CartComponent,title:"cart"},
        {path:"products",component:ProductComponent,title:"products"},
        {path:"bards",component:BrandsComponent,title:"bards"},
        {path:"category",component:CategoriesComponent,title:"category"},
        {path:"details/:_id",component:ProductdetailsComponent,title:"ProductDetails"},
        {path:"order/:id",component:OrderComponent,title:"order"},
        {path:"wishlist",component:WishListComponent,title:"wishlist"}
        
        
    ]},
    {path:'**',component:NotfoundpageComponent,title:"Not found"
    }
];
