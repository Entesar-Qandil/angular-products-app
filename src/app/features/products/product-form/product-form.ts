import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ProductService } from '../../../core/product.service';
import { ProductCategory } from '../../../core/models';

@Component({
  standalone: true,
  selector: 'app-product-form',
  templateUrl: './product-form.html',
  imports: [CommonModule, FormsModule, RouterModule, DropDownsModule, InputsModule, ButtonsModule]
})
export class ProductForm {
  private ps = inject(ProductService);
  private router = inject(Router);

  model = { name: '', price: null as any, category: null as ProductCategory | null, image: '' };
  categories: ProductCategory[] = ['Electronics', 'Food', 'Toys', 'Books', 'Others'];

  submit(f: NgForm) {
    if (f.invalid) return;
    this.ps.addProduct(this.model as { name: string; price: number; category: ProductCategory; image?: string });
    this.router.navigate(['/products']);
  }
}
