import { useReducer } from "react";
import { Action, RequestState } from "./useWebAuthn.types";

const initialState = {
    credential: undefined,
    loading: false,
    error: undefined,
}

const createReducer = () => (
    state: RequestState,
    action: Action
): RequestState => {
    switch (action.type) {
        case 'REGISTERING':
            return {
                ...state,
                loading: true,
            };
        case 'REGISTERED':
            return {
                ...state,
                loading: false,
                credential: action.payload,
            };
        case 'REGISTER_ERROR':
            return {
                ...state,
                loading: false,
                credential: undefined,
                error: action.payload,
            };
            
        case 'ASSERTING':
            return {
                ...state,
                loading: true,
                error: undefined,
                credential: undefined,
            };
        case 'ASSERTED':
            return {
                ...state,
                loading: false,
                credential: action.payload,
            };
        case 'ASSERT_ERROR':
            return {
                ...state,
                loading: false,
                credential: undefined,
                error: action.payload,
            };
    }
}

const useWebAuthnReducer = () => useReducer(createReducer(), initialState);

export default useWebAuthnReducer;