export type ProductCategory = 'Electronics' | 'Food' | 'Toys' | 'Books' | 'Others';

export interface ProductsItem {
    id: string;
    name: string;
    price: number;
    category: ProductCategory;
    dateOfCreation: string;
     image?: string;
}
