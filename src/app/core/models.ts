export type productCategory = 'Electronics' | 'Food' | 'Toys' | 'Books' | 'Others';

export interface productsItem {
    id: string;
    name: string;
    price: number;
    category: productCategory;
    dateOfCreation: string;
}
