import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Session, User } from '../../types/verification';
import { v4 as uuid } from 'uuid';

interface UseSessionStore {
    stored: Session[];
    
    registerSession: (user: User) => void;
    updateSession: (sessionId: any) => void;
    removeSession: (session: Session) => void;
    updateSessionAccess: (sessionId: any) => void;
    
    sessionById: (id: string) => Session | undefined;
    sessionByUserParam: (userId: string, param: keyof User) => Session | undefined;
}

const persistenceConfig = {
    name: 'sessions',
    getStorage: () => window.localStorage,
}

const useSessionStore = create(
    persist<UseSessionStore>(
        (set, get) => ({
            stored: [],
            
            registerSession: (user) => {
                const session: Session = {
                    id: uuid(),
                    user,
                    lastAccess: new Date().toISOString()
                }
                
                set({
                    stored: [...get().stored, session]
                })
            },
            
            updateSession: (update: Session) => {
                set({
                    stored: get().stored.map(s => {
                        if (s.id === update.id) {
                            return {
                                ...s,
                                update
                            }
                        } else {
                            return s
                        };
                    })
                });
            },
            
            removeSession: (session: Session) => set({
                stored: get().stored.filter(s => s.id !== session.id)
            }),
            
            updateSessionAccess: (sessionId: any) => {
                set({
                    stored: get().stored.map(s => {
                        if (s.id === sessionId) {
                            return {
                                ...s,
                                lastAccess: new Date().toISOString()
                            }
                        } else {
                            return s
                        };
                    })
                });
            },
            
            sessionById: (id: string) => get().stored.find(s => s.id === id),
            sessionByUserParam: (value: string, param) => get().stored.find(s => s.user[param] === value)
        }),
        persistenceConfig
    )
)

export default useSessionStore;