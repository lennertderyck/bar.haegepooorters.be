import { useReducer } from "react"
import { Action, Cart, CartPurchaseState } from "./useCart.types"

const initialPurchaseState: CartPurchaseState = {
    data: null,
    error: null,
    loading: false,
}

const initialState: Cart = {
    total: 0,
    items: window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart') || '[]') : [],
    purchase: initialPurchaseState,
}

const createReducer = () => (
    state: Cart,
    action: Action
): Cart => {
    switch (action.type) {
        case 'ADD_ITEM':
            const f1 = state.items.findIndex(item => item.id === action.payload.id)  
            
            if (f1 === -1) {
                const newItem = {
                    ...action.payload,
                    amount: 1,
                }
                
                return {
                    ...state,
                    items: [...state.items, newItem],
                }
            } else {
                const item = state.items[f1]
                const newItem = {
                    ...item,
                    amount: item.amount + 1,
                }
                
                return {
                    ...state,
                    items: [...state.items.slice(0, f1), newItem, ...state.items.slice(f1 + 1)],
                }
            }
        case 'REMOVE_SINGLE':
            const f2 = state.items.findIndex(item => item.id === action.payload.id);
            
            if (f2 === -1) {
                return state;
            } else {
                const item = state.items[f2]
                const newItem = {
                    ...item,
                    amount: item.amount - 1,
                }
                
                if (newItem.amount === 0) {
                    return {
                        ...state,
                        items: [...state.items.slice(0, f2), ...state.items.slice(f2 + 1)],
                    }
                } else {
                    return {
                        ...state,
                        items: [...state.items.slice(0, f2), newItem, ...state.items.slice(f2 + 1)],
                    }
                }
            }
        case 'REMOVE_ITEM':
            const f3 = state.items.filter(item => item.id !== action.payload.id);
            
            return {
                ...state,
                items: f3,
            }
        case 'CLEAR_CART':
            return {
                ...state,
                items: [],
            }
        case 'PURCHASE_INIT': 
            return {
                ...state,
                purchase: {
                    ...state.purchase,
                    loading: true,
                    error: null,
                }
            }
        case 'PURCHASE_SUCCESS': 
            return {
                ...state,
                purchase: {
                    ...state.purchase,
                    loading: false,
                    data: action.payload,
                }
            }
        case 'PURCHASE_FAILED':
            return {
                ...state,
                purchase: {
                    ...state.purchase,
                    loading: false,
                    error: action.payload,
                }
            }
        default: return state;
    }
}

export { initialState }
export default () => useReducer(createReducer(), initialState);