import { Routes } from '@angular/router';
import { ProductList } from './features/products/product-list/product-list';
import { ProductDetail } from './features/products/product-detail/product-detail';
import { ProductForm } from './features/products/product-form/product-form';
import { addGuard } from './core/add-guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },

  { path: 'products', component: ProductList, title: 'Products' },
  { path: 'products/add', component: ProductForm, canActivate: [addGuard], title: 'Add Product' },
  { path: 'products/:id', component: ProductDetail, title: 'Product' },

  { path: '**', redirectTo: 'products' },
];
