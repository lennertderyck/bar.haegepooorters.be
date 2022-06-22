import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react"
import { ID } from "../../../types/general";
import { LoginCredentials, RegisterCredentials, Session, User } from "../../../types/verification";
import { authContext } from "../../contexts/AuthContext/AuthContext"
import { AuthFunctions, UseAuth } from "./useAuth.types";
import { v4 as uuid } from 'uuid';
import { Wallet } from "../../../types/wallet";

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
            const user = response.data.user;  
            const sessionSaved = getSessionByEmail(user.email);
            
            if (sessionSaved) {
                updateSessionAccess(sessionSaved.id);
            } else {
                storeNewSession(user);
            }
            
            dispatch({ type: 'AUTH_SUCCESS', payload: response.data })
        });
        request.catch((error: any) => dispatch({ type: 'AUTH_FAILED', payload: error }));
    }
    
    const refreshUser = () => {
        
    }
    
    const loginRetry = () => {
        dispatch({ type: 'AUTH_RETRY' });
    }
    
    const selectWallet = useCallback((wallet: Wallet) => {
        window.localStorage.setItem('selectedWallet', JSON.stringify(wallet));
        dispatch({
            type: 'WALLET_SELECT',
            payload: wallet
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
        selectWallet,
    };
}

export default useAuth;