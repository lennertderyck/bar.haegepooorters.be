import create from 'zustand';
import { persist } from 'zustand/middleware';
import { ID } from '../../../types/general';
import flags from '../../../utils/data/flags';
import UseFlags from './useFlags.types';

const persistenceConfig = {
    name: 'flags',
    getStore: () => window.localStorage
}

const useFlags = create(
    persist<UseFlags>(
        (set, get) => ({
            flags,
            
            toggleFlag: (flag: ID, newState?: boolean) => {
                set((state) => {
                    const flags = state.flags;
                    
                    const update = flags.map(f => {
                        if (f.id === flag) {
                            return {
                                ...f,
                                state: newState ?? !f.state
                            }
                        } else {
                            return f
                        }
                    })
                    
                    return {
                        flags: update
                    }
                })
            },
            
            enable: (flag: ID) => {
                set((state) => {
                    const flags = state.flags;
                    
                    const update = flags.map(f => {
                        if (f.id === flag) {
                            return {
                                ...f,
                                state: true
                            }
                        } else {
                            return f
                        }
                    })
                    
                    return {
                        flags: update
                    }
                })
            },
            
            disable: (flag: ID) => {
                set((state) => {
                    const flags = state.flags;
                    
                    const update = flags.map(f => {
                        if (f.id === flag) {
                            return {
                                ...f,
                                state: false
                            }
                        } else {
                            return f
                        }
                    })
                    
                    return {
                        flags: update
                    }
                })
            },
            
            flagById: (id: string) => get().flags.find(f => f.id === id),
        }),
        persistenceConfig
    )
);

export default useFlags;