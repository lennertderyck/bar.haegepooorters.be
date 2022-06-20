import { useReducer } from "react";
import { Action, RequestState } from "./useAxiosBeta.types";

const initialState = {
    data: undefined,
    loading: false,
    error: undefined,
}

const createReducer = <Data>() => (
    state: RequestState<Data>,
    action: Action<Data>
): RequestState<Data> => {
    switch (action.type) {
        case 'REQUEST_INIT':
            return {
                ...state,
                error: undefined,
                loading: true,
            }
        case 'REQUEST_SUCCESS':
            return {
                ...state,
                data: action.payload,
                error: undefined,
                loading: false,
            }
        case 'REQUEST_FAILED':
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        case 'REQUEST_ABORT':
            return {
                ...state,
                loading: false
            }
    }
}

export default <Data>() => useReducer(createReducer<Data>(), initialState);