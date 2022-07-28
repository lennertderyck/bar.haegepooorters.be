import { ID } from "./general";
import { Wallet } from "./wallet";

export type Pin = number[]

export type UserBasics = {
    firstName: string,
    lastName: string,
    email: string,
}
export type UserMeta = {
    id: ID,
    createdAt: string,
    updatedAt: string,
    role: ID,
}
export type User = UserMeta & UserBasics;
export type AuthenticatedUser = {
    user: User,
    token: string,
    wallets: Wallet[],
};

export type LoginCredentials = {
    email: string,
    pin: string
}

export type RegisterCredentials = {
    email: string,
    pin: Pin
} & UserBasics

export type FreshSession = {
    user: User,
}

export type Session = FreshSession & {
    id: any,
    lastAccess: string,
}