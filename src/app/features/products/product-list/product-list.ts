import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ProductService } from '../../../core/product.service';
import { ExpensiveHighlight } from '../../../shared/expensive-highlight';
import { CategoryFilterPipe } from '../../../shared/category-filter-pipe';
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
    CategoryFilterPipe
  ]
})
export class ProductList {
  private readonly productService = inject(ProductService);
  products = this.productService.allProducts;

  categories: (ProductCategory | 'All')[] = ['All', 'Electronics', 'Food', 'Toys', 'Books', 'Others'];
  selectedCategory: ProductCategory | 'All' = 'All';

  removeProduct(id: string) {
    this.productService.removeProduct(id);
  }
}
