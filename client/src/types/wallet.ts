import { CartItem } from "./bar"
import { ID, Record } from "./general"
import { User } from "./verification"

export interface WalletProvider extends Record {
    label: string,
}

export interface Wallet extends Record {
    balance: number;
    provider: WalletProvider;
}

export interface Purchase {
    items: CartItem[];
    wallet: ID;
}

export interface Transaction extends Purchase, Record {};