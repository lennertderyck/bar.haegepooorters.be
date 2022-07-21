export type Error = any;

export type ID = string;

export interface Record {
    id: ID;
    createdAt: string;
    updatedAt: string;
}

export type FeatureFlag = {
    label: string;
    id: string;
    default: boolean;
    description: string;
}

export type Intrest = number;