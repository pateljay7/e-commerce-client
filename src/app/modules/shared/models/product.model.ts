export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  manufacturer: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface CreateProductModel {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  manufacturer: string;
}

export enum ProductCategory {
  Electronics = 'Electronics',
  Clothing = 'Clothing',
  Books = 'Books',
  Other = 'Other',
}
