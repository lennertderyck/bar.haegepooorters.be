import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { Product } from "../../../types/bar";
import { ID } from "../../../types/general";
import { Transaction } from "../../../types/wallet";
import { cartContext } from "../../contexts/CartContext/CartContext";
import useAuth from "../useAuth/useAuth";
import useEndPoints from "../useEndpoints/useEndpoints";
import { UseCart } from "./useCart.types";
import { initialState } from "./useCartReducer";

const useCart: UseCart = () => {
    const endpoints = useEndPoints();
    const { user, selectedWallet, refreshUser } = useAuth()
    const { cartState, dispatch } = useContext(cartContext);
    
    const addItem = (item: any) => {
        dispatch({
            type: "ADD_ITEM",
            payload: item
        });
    }
    
    const removeSingle = (item: any) => {
        dispatch({
            type: "REMOVE_SINGLE",
            payload: item
        });
    }
    
    const removeItem = (item: any) => {
        dispatch({
            type: "REMOVE_ITEM",
            payload: item
        });
    }
    
    const getItem = (item: Product) => {
        const foundItem = cartState.items.find(i => i.id === item.id);
        
        return foundItem || { ...item, amount: 0 };
    }
    
    const clearCart = () => {
        dispatch({
            type: "CLEAR_CART"
        });
    }
    
    const getWalletById = (id: ID) => {
        return user?.wallets.find(w => w.id === id);
    }
    
    const startPurchase = () => {
        dispatch({
            type: "PURCHASE_INIT"
        });
        
        const collectItems = cartState.items.map(item => ({
            product: item.id,
            amount: item.amount
        }));
        
        const transaction = axios(endpoints.user.purchase, 
            { 
                data: {
                    wallet: selectedWallet?.id,
                    items: collectItems
                },
                method: 'POST', 
                headers: { 
                    'Content-Type': 'application/json' ,
                    'Authorization': 'Bearer ' + user?.token
                }
            }
        )
        
        transaction.then((response) => {
            const data: Transaction = response.data;
            dispatch({
                type: "PURCHASE_SUCCESS",
                payload: data
            });
            clearCart();
            refreshUser();
        })
        
        transaction.catch((error: Error) => {
            dispatch({
                type: "PURCHASE_FAILED",
                payload: error
            });
        })
        
        return transaction;
    }
    
    const total = cartState.items.reduce((acc, item) => {
        return acc + item.price * item.amount;
    }, initialState.total);
    
    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cartState.items));
    }, [ cartState.items ])
    
    return {
        ...cartState,
        total,
        addItem,
        removeSingle,
        removeItem,
        getItem,
        clearCart,
        getWalletById,
        startPurchase,
    }
}

export default useCart;