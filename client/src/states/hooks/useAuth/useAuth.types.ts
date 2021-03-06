import { Error, ID } from "../../../types/general";
import { AuthenticatedUser, LoginCredentials, Session, User } from "../../../types/verification";
import { Wallet } from "../../../types/wallet";

export interface AuthReducerState {
    user: AuthenticatedUser | null;
    loading: boolean;
    error: Error | null;
    isAuthenticated: boolean;
    selectedWallet: Wallet | undefined;
}

export interface AuthState extends AuthReducerState {
    sessions: Session[];
    latestSession: Session;
}

export type Action =
| { type: 'AUTH_INIT' }
| { type: 'AUTH_ABORT' }
| { type: 'AUTH_RETRY' }
| { type: 'AUTH_INITIAL' }
| { type: 'AUTH_SUCCESS'; payload: AuthenticatedUser }
| { type: 'AUTH_FAILED'; payload: Error }
| { type: 'WALLET_SELECT'; payload: Wallet }
| { type: 'USER_REFRESH'; payload: AuthenticatedUser };

export type AuthFunctions = {
    login: (credentials: LoginCredentials) => void;
    loginRetry: () => void;
    refreshUser: () => void;
    logout: (currentPageUrl?: string) => void;
    
    getSessionById: (id: ID) => Session | undefined;
    getSessionByEmail: (email: string) => Session | undefined;
    
    selectWallet: (wallet: ID) => void;
}

export type UseAuthProperties = AuthState & AuthFunctions;
export type UseAuth = () => UseAuthProperties;