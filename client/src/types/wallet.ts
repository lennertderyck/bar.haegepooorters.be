import { CartItem } from "./bar"
import { ID, Intrest, Record } from "./general"
import { User } from "./verification"

export interface CreditProvider extends Record {
    label: string,
}

export interface Wallet extends Record {
    balance: number;
    provider: CreditProvider;
}

export interface Purchase {
    items: CartItem[];
    wallet: ID;
    intrest: Intrest;
}

export interface Transaction extends Record {
    wallet: Wallet,
    items: [{
        amount: number,
        product: CartItem
    }]
};