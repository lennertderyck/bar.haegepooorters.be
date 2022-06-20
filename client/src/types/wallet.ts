import { CartItem } from "./bar"
import { ID, Record } from "./general"
import { User } from "./verification"

export interface Wallet extends Record {
    label: string,
    balance: number,
}

export interface Purchase {
    items: CartItem[],
    wallet: ID,
}

export interface Transaction extends Purchase, Record {};