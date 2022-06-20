import { createContext, Dispatch, FC } from "react";
import { Action } from "../../hooks/useCart/useCart.types";
import { initialState } from "../../hooks/useCart/useCartReducer";
import useCartReducer from "../../hooks/useCart/useCartReducer";

const stub: Dispatch<Action> = () => {
    throw new Error('You forgot to wrap your component in <PollingProvider>.')
}

const initialContext = { cartState: initialState, dispatch: stub }
const cartContext = createContext(initialContext);
const ContextProvider = cartContext.Provider;

type Props = {
    children: any;
}

const CartContextProvider: FC<Props> = ({ children }) => {
    const [ cartState, dispatch ] = useCartReducer();
    
    return (
        <ContextProvider value={{ cartState, dispatch }}>
            { children }
        </ContextProvider>
    )
}

export { cartContext };
export default CartContextProvider;