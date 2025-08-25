import { Injectable, signal, computed, effect } from '@angular/core';
import { ProductsItem, ProductCategory } from './models';

const STORING_KEY = 'items';

@Injectable({ providedIn: 'root' })
export class ProductService {
  
  private readonly item_State = signal<ProductsItem[]>(this.loadProducts());

 
  readonly items = computed(() => this.item_State());

  constructor() {
   
    effect(() => {
      localStorage.setItem(STORING_KEY, JSON.stringify(this.item_State()));
    });
  }


  addProduct(data: { name: string; price: number; category: ProductCategory }) {
    const now = new Date().toISOString();
    const newItem: ProductsItem = {
      id: crypto.randomUUID(),
      name: data.name,
      price: data.price,
      category: data.category,
      dateOfCreation: now,
    };
    this.item_State.update(list => [newItem, ...list]);
  }

  updateProduct(id: string, patch: Partial<Omit<ProductsItem, 'id'>>) {
    this.item_State.update(list =>
      list.map(it => (it.id === id ? { ...it, ...patch } : it))
    );
  }

  removeProduct(id: string) {
    this.item_State.update(list => list.filter(it => it.id !== id));
  }

  getProductById(id: string) {
    return this.item_State().find(it => it.id === id);
  }

  DemoData() {
    if (this.item_State().length) return;
    const now = new Date().toISOString();
    this.item_State.set([
      { id: crypto.randomUUID(), name: 'Laptop',  price: 999, category: 'Electronics', dateOfCreation: now },
      { id: crypto.randomUUID(), name: 'love hate',    price:  25, category: 'Books',       dateOfCreation: now },
      { id: crypto.randomUUID(), name: 'Toy Car', price:  40, category: 'Toys',        dateOfCreation: now },
    ]);
  }

  private loadProducts(): ProductsItem[] {
    try {
      const raw = localStorage.getItem(STORING_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}
