import { useReducer } from 'react';
import { Action, AuthReducerState } from './useAuth.types';

const cachedWallet = window.localStorage.getItem('selectedWallet');
const initialValues: AuthReducerState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    selectedWallet: cachedWallet ? JSON.parse(cachedWallet) : undefined,
}

const createReducer = () => (
    state: AuthReducerState,
    action: Action
): AuthReducerState => {
    switch (action.type) {
        case 'AUTH_INIT':
            return {
                ...state,
                error: undefined,
                loading: true,
            }
        case 'AUTH_SUCCESS':
            return {
                ...state,
                user: action.payload,
                error: undefined,
                loading: false,
                isAuthenticated: true,
            }
        case 'AUTH_RETRY':
            return {
                ...state,
                error: null,
                loading: false,
                isAuthenticated: true,
            }
        case 'AUTH_FAILED':
            return {
                ...state,
                error: action.payload,
                loading: false,
                isAuthenticated: true,
            }
        case 'AUTH_ABORT':
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
            }
        case 'WALLET_SELECT':
            return {
                ...state,
                selectedWallet: action.payload,
            }
    }
}

export { initialValues };
export default () => useReducer(createReducer(), initialValues);