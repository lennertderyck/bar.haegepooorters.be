export interface RequestState {
    credential: Credential | undefined,
    loading: boolean,
    error: Error | undefined,
}

export type Action =
    | { type: 'REGISTERING' }
    | { type: 'REGISTERED', payload: Credential }
    | { type: 'REGISTER_ERROR', payload: Error }
    | { type: 'ASSERTING' }
    | { type: 'ASSERTED', payload: Credential }
    | { type: 'ASSERT_ERROR', payload: Error };
    
export type States = {
    register: () => void,
    assertion: () => void,
    state: RequestState
}

export type UseWebAuthn = () => States;