import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../core/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h2 style="margin:8px 0">Products ({{ svc.items().length }})</h2>

    <div style="display:flex; gap:8px; margin-bottom:10px;">
      <button (click)="seed()">Seed demo data</button>
      <button (click)="quickAdd()">+ Quick add</button>
    </div>

    <ul *ngIf="svc.items().length; else empty">
      <li *ngFor="let p of svc.items()">
        <strong>{{ p.name }}</strong> — {{ p.price | currency:'USD' }}
        <small> • {{ p.category }} • {{ p.dateOfCreation | date:'mediumDate' }}</small>

        <a [routerLink]="['/products', p.id]" style="margin-left:6px">view</a>
        <button (click)="remove(p.id)" style="margin-left:6px">delete</button>
      </li>
    </ul>

    <ng-template #empty>
      <p>No items yet.</p>
    </ng-template>
  `
})
export class ProductList {
  svc = inject(ProductService);

  seed() {
    this.svc.DemoData();
  }

  quickAdd() {
    this.svc.addProduct({ name: 'New Item', price: 10, category: 'Others' });
  }

  remove(id: string) {
    this.svc.removeProduct(id);
  }
}
