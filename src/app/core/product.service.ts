import { Injectable, signal, computed, effect } from '@angular/core';
import { ProductsItem, ProductCategory } from './models';

type NewProduct = { name: string; price: number; category: ProductCategory; image?: string };

const STORAGE_KEY = 'products';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly productList = signal<ProductsItem[]>(this.loadFromStorage());

  readonly allProducts = computed(() => this.productList());
  readonly totalCount = computed(() => this.productList().length);
  readonly totalPrice = computed(() => this.productList().reduce((sum, p) => sum + p.price, 0));

  constructor() {
    effect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(this.productList())));
  }

  addProduct(input: NewProduct) {
    const name = input.name?.trim();
    const price = Number(input.price);
    if (!name || name.length < 2 || !isFinite(price) || price <= 0) return;

    const now = new Date().toISOString();
    const newItem: ProductsItem = {
      id: crypto.randomUUID(),
      name,
      price,
      category: input.category,
      dateOfCreation: now,
      image: input.image || ''
    };
    this.productList.update(list => [newItem, ...list]);
  }

  updateProduct(id: string, patch: Partial<Omit<ProductsItem, 'id'>>) {
    this.productList.update(list =>
      list.map(p =>
        p.id === id
          ? { ...p, ...patch, name: patch.name?.trim() ?? p.name }
          : p
      )
    );
  }

  removeProduct(id: string) {
    this.productList.update(list => list.filter(p => p.id !== id));
  }

  getById(id: string) {
    return this.productList().find(p => p.id === id);
  }

  reset() {
    this.productList.set([]);
  }

  loadDemo() {
    if (this.productList().length) return;
    const now = new Date().toISOString();
    this.productList.set([
      { id: crypto.randomUUID(), name: 'Laptop', price: 999, category: 'Electronics', dateOfCreation: now, image: 'https://picsum.photos/seed/l1/200' },
      { id: crypto.randomUUID(), name: 'love hate', price: 25, category: 'Books', dateOfCreation: now, image: 'https://picsum.photos/seed/b1/200' },
      { id: crypto.randomUUID(), name: 'Toy Car', price: 40, category: 'Toys', dateOfCreation: now, image: 'https://picsum.photos/seed/t1/200' },
    ]);
  }

  private loadFromStorage(): ProductsItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}
