import { createContext, Dispatch, FC } from "react";
import { Action } from "../../hooks/useAuth/useAuth.types";
import useAuthReducer, { initialValues } from "../../hooks/useAuth/useAuthReducer";

const stub: Dispatch<Action> = () => {
    throw new Error('You forgot to wrap your component in <PollingProvider>.')
}

const initialContext = { authState: initialValues, dispatch: stub }
const authContext = createContext(initialContext);
const ContextProvider = authContext.Provider;

type Props = {
    children: any;
}

const AuthContextProvider: FC<Props> = ({ children }) => {
    const [ authState, dispatch ] = useAuthReducer();
    
    return (
        <ContextProvider value={{ authState, dispatch }}>
            { children }
        </ContextProvider>
    )
}

export { authContext };
export default AuthContextProvider;