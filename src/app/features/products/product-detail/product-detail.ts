import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ProductService } from '../../../core/product.service';
import { ProductsItem, ProductCategory } from '../../../core/models';

@Component({
  standalone: true,
  selector: 'app-product-detail',
  templateUrl: './product-detail.html',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, DropDownsModule, InputsModule, ButtonsModule]
})
export class ProductDetail implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ps = inject(ProductService);

  product?: ProductsItem;
  isReadOnly = false;
  categories: ProductCategory[] = ['Electronics', 'Food', 'Toys', 'Books', 'Others'];

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    category: [null as ProductCategory | null, Validators.required],
    image: ['']
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    const p = this.ps.getById(id);
    if (!p) { this.router.navigate(['/products']); return; }

    this.product = p;
    this.form.setValue({
      name: p.name,
      price: p.price,
      category: p.category,
      image: p.image || ''
    });

    const mode = this.route.snapshot.queryParamMap.get('mode');
    if (mode === 'view') {
      this.isReadOnly = true;
      this.form.disable();
    }
  }

  save() {
    if (this.form.invalid || !this.product) return;
    this.ps.updateProduct(this.product.id, this.form.value as any);
    this.router.navigate(['/products']);
  }

  delete() {
    if (!this.product) return;
    this.ps.removeProduct(this.product.id);
    this.router.navigate(['/products']);
  }
}
