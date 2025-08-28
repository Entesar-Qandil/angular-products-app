import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ProductService } from '../../../core/product.service';
import { ExpensiveHighlight } from '../../../shared/expensive-highlight';
import { CategoryFilterPipe } from '../../../shared/category-filter-pipe';
import { ProductActions } from '../product-actions/product-actions';
import { ProductCategory } from '../../../core/models';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    GridModule,
    ButtonsModule,
    DropDownsModule,
    DatePipe,
    CurrencyPipe,
    ExpensiveHighlight,
    CategoryFilterPipe,
    ProductActions
  ]
})
export class ProductList {
  private readonly productService = inject(ProductService);

  products = this.productService.allProducts;

  categories: (ProductCategory | 'All')[] = ['All', 'Electronics', 'Food', 'Toys', 'Books', 'Others'];

  selectedCategory = signal<ProductCategory | 'All'>('All');


  filtered = computed(() => {
    const list = this.products() ?? [];
    const cat = this.selectedCategory();
    return cat === 'All' ? list : list.filter(p => p.category === cat);
  });

  totalPrice = this.productService.totalPrice;

  removeProduct(id: string) {
    this.productService.removeProduct(id);
  }
}
