import { AxiosResponse } from "axios";
import { CartItem, Product } from "../../../types/bar";
import { Error, ID } from "../../../types/general";
import { Purchase, Transaction, Wallet } from "../../../types/wallet";

export interface CartPurchaseState {
    data: Transaction | null;
    error: any;
    loading: boolean;
}

export interface Cart {
    total: number;
    items: CartItem[];
    purchase: CartPurchaseState;
}

export interface CartFunctions {
    addItem: (item: Product) => void;
    removeSingle: (item: Product) => void;
    removeItem: (item: Product) => void;
    getItem: (item: Product) => CartItem;
    clearCart: () => void;
    getWalletById: (id: ID) => Wallet | undefined;
    startPurchase: () => Promise<AxiosResponse>;
}

export type Action = 
| { type: 'ADD_ITEM'; payload: Product }
| { type: 'REMOVE_SINGLE'; payload: Product }
| { type: 'REMOVE_ITEM'; payload: Product }
| { type: 'PURCHASE_INIT' }
| { type: 'PURCHASE_SUCCESS', payload: Transaction }
| { type: 'PURCHASE_FAILED', payload: Error }
| { type: 'CLEAR_CART' };

export type UseCartProperties = Cart & CartFunctions;
export type UseCart = () => UseCartProperties;