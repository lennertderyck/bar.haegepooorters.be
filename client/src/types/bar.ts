import { ID, Record } from "./general";

export interface ProductCatergory extends Record {
    name: string;
    description: string;
}

export interface Product extends Record {
    name: string;
    price: number;
    image: string;
    category: ProductCatergory;
    description: string;
    available: boolean;
    quantity: string;
}

export interface CartItem extends Product {
    amount: number;
}