import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react"
import { ID } from "../../../types/general";
import { AuthenticatedUser, LoginCredentials, RegisterCredentials, Session, User } from "../../../types/verification";
import { authContext } from "../../contexts/AuthContext/AuthContext"
import { AuthFunctions, UseAuth } from "./useAuth.types";
import { v4 as uuid } from 'uuid';
import { Wallet } from "../../../types/wallet";
import { info } from "console";

const useAuth: UseAuth = () => {
    const { authState, dispatch } = useContext(authContext);
    
    const sessions: Session[] = JSON.parse(window.localStorage.getItem('sessions') || '[]');
    
    const getStoredSessions = (): Session[] => {
        return JSON.parse(window.localStorage.getItem('sessions') || '[]');
    }
    
    const getSessionById = (id: string): Session | undefined => {
        return getStoredSessions().find(session => session.id === id);
    }
    
    const getSessionByEmail = (email: string): Session | undefined => {
        return getStoredSessions().find(session => session.user.email === email);
    }
    
    const getLatestSession = () => {
        const sortedSession = getStoredSessions().sort((a, b) => {
            return new Date(a.lastAccess).getTime() - new Date(b.lastAccess).getTime()
        });
        
        return sortedSession?.[0];
    }
    
    const storeSessions = (sessions: Session[]) => {
        window.localStorage.setItem('sessions', JSON.stringify(sessions));
    }
    
    const createNewSession = (user: User): Session => {
        const session: Session = {
            id: uuid(),
            user,
            lastAccess: new Date().toISOString()
        }
        
        return session;
    }
    
    const storeNewSession = (user: User) => {
        const newSession = createNewSession(user);
        const storedSessions = getStoredSessions();
        return storeSessions([...storedSessions, newSession]);
    }
    
    const updateSession = (update: Session) => {
        const newSessions = sessions.map(session => {
            if (session.id === update.id) {
                return {
                    ...session,
                    ...update
                };
            } else {
                return session;
            }
        })
        storeSessions(newSessions);
    }
    
    const updateSessionAccess = (id: ID) => {
        const session = getSessionById(id);
        
        if (session) {
            updateSession({
                ...session,
                lastAccess: new Date().toISOString()
            })
        }
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
                    'Authorization': authState.user.token
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
        window.localStorage.setItem('selectedWallet', JSON.stringify(wallet));
        const foundWallet = authState.user?.wallets.find(w => w.id === wallet) as Wallet;
        
        dispatch({
            type: 'WALLET_SELECT',
            payload: foundWallet
        })
    }, [authState.user])
    
    return {
        ...authState,
        sessions,
        get latestSession() {  return getLatestSession() },
        getSessionById,
        getSessionByEmail,
        login,
        loginRetry,
        refreshUser,
        selectWallet,
    };
}

export default useAuth;