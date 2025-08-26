import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ProductService } from '../../../core/product.service';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  imports: [CommonModule, RouterModule, GridModule, ButtonsModule, DatePipe, CurrencyPipe]
})
export class ProductList {
  private ps = inject(ProductService);
  products = this.ps.allProducts;

  remove(id: string) {
    this.ps.removeProduct(id);
  }
}
