import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@Component({
  standalone: true,
  selector: 'app-product-actions',
  imports: [CommonModule, RouterModule, ButtonsModule],
  template: `
    <a kendoButton size="small" [routerLink]="['/products', id]" [queryParams]="{ mode: 'view' }">View</a>
    <a kendoButton size="small" [routerLink]="['/products', id]">Edit</a>
    <button kendoButton size="small" themeColor="error" (click)="delete.emit(id)">Delete</button>
  `
})
export class ProductActions {
  @Input() id!: string;
  @Output() delete = new EventEmitter<string>();
}
