import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 style="margin:8px 0">Add Product (temp)</h2>
    <button (click)="addSample()">Add sample product</button>
    <p style="margin-top:8px;">(Template-driven)</p>
  `
})
export class ProductForm {
  private svc = inject(ProductService);

  addSample() {
    this.svc.addProduct({ name: 'Sample from /add', price: 50, category: 'Food' });
  }
}
