import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ProductService } from '../../../core/product.service';
import { ExpensiveHighlight } from '../../../shared/expensive-highlight';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  imports: [CommonModule, RouterModule, GridModule, ButtonsModule, DatePipe, CurrencyPipe, ExpensiveHighlight]
})
export class ProductList {
  private readonly productService = inject(ProductService);
  products = this.productService.allProducts;

  removeProduct(id: string) {
    this.productService.removeProduct(id);
  }
}
