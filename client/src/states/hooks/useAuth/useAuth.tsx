import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react"
import { ID } from "../../../types/general";
import { AuthenticatedUser, LoginCredentials, RegisterCredentials, Session, User } from "../../../types/verification";
import { authContext } from "../../contexts/AuthContext/AuthContext"
import { AuthFunctions, UseAuth } from "./useAuth.types";
import { v4 as uuid } from 'uuid';
import { Wallet } from "../../../types/wallet";
import { info } from "console";
import useSessionStore from "../../stores/useSessionStore";
import { useNavigate } from "react-router-dom";

const useAuth: UseAuth = () => {
    const navigate = useNavigate();
    const { stored: sessions, sessionById, sessionByUserParam, registerSession, updateSession, updateSessionAccess } = useSessionStore();
    const { authState, dispatch } = useContext(authContext);
    
    const getSessionByEmail = (email: string): Session | undefined => {
        return sessions.find(session => session.user.email === email);
    }
    
    const getLatestSession = () => {
        const sortedSession = sessions.sort((a, b) => {
            return new Date(a.lastAccess).getTime() - new Date(b.lastAccess).getTime()
        });
        
        return sortedSession?.[0];
    }
    
    const storeNewSession = (user: User) => {
        registerSession(user);
    }
    
    const login: AuthFunctions['login'] = (credentials: LoginCredentials) => {
        dispatch({ type: 'AUTH_INIT' });
        
        const request = axios((process.env.REACT_APP_API_URL || 'http://localhost:4000') + '/login', {
            method: 'POST',
            data: credentials
        });
        
        request.then((response) => {
            const data = response.data as AuthenticatedUser;
            const user = data.user;
            const sessionSaved = getSessionByEmail(user.email);
            const cachedWalletId = window.localStorage.getItem('selectedWallet');
            
            if (sessionSaved) {
                updateSessionAccess(sessionSaved.id);
            } else {
                storeNewSession(user);
            }
            
            dispatch({ type: 'AUTH_SUCCESS', payload: response.data })
            
            if (cachedWalletId) {
                console.log('cachedWalletId', cachedWalletId)
                const selectedWallet = data.wallets.find(w => w.id === cachedWalletId)
                
                console.log('selectedWallet', selectedWallet)
                
                if (selectedWallet) {
                    dispatch({ type: 'WALLET_SELECT', payload: selectedWallet })
                }
            }
        });
        request.catch((error: any) => dispatch({ type: 'AUTH_FAILED', payload: error }));
    }
    
    const refreshUser: AuthFunctions['refreshUser'] = () => {
        if (authState?.user) {
            const request = axios((process.env.REACT_APP_API_URL || 'http://localhost:4000') + '/user', {
                headers: {
                    'Authorization': 'Bearer ' + authState.user.token
                }
            });
            
            request.then((response) => {
                const user = response.data.user;  
                const sessionSaved = getSessionByEmail(user.email);
                
                if (sessionSaved) {
                    updateSessionAccess(sessionSaved.id);
                } else {
                    storeNewSession(user);
                }
                
                dispatch({ type: 'USER_REFRESH', payload: response.data })
            });
        }
    }
    
    const loginRetry = () => {
        dispatch({ type: 'AUTH_RETRY' });
    }
    
    const selectWallet = useCallback((wallet: ID) => {
        window.localStorage.setItem('selectedWallet', wallet);
        const foundWallet = authState.user?.wallets.find(w => w.id === wallet) as Wallet;
        
        dispatch({
            type: 'WALLET_SELECT',
            payload: foundWallet
        })
    }, [authState.user])
    
    const logout: AuthFunctions['logout'] = (currentPageUrl?: string) => {
        dispatch({
            type: 'AUTH_INITIAL',
        })
        navigate('/session');
    }
    
    return {
        ...authState,
        sessions,
        get latestSession() { return getLatestSession() },
        getSessionById: sessionById,
        getSessionByEmail,
        login,
        loginRetry,
        logout,
        refreshUser,
        selectWallet,
    };
}

export default useAuth;