import { Pipe, PipeTransform } from '@angular/core';
import { ProductsItem, ProductCategory } from '../core/models';

type Cat = ProductCategory | 'All' | null | undefined;

@Pipe({
  name: 'categoryFilter',
  standalone: true,
  pure: true
})
export class CategoryFilterPipe implements PipeTransform {
  transform(list: ProductsItem[] | null | undefined, category: Cat): ProductsItem[] {
    if (!list?.length || !category || category === 'All') return list ?? [];
    return list.filter(p => p.category === category);
  }
}
