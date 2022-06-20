import { assertWebAuthnCredential, requestWebAuthnCredentials } from '../../../utils/webAuth.auth';
import { UseWebAuthn } from './useWebAuthn.types';
import useWebAuthnReducer from './useWebAuthn.reducer';

// type Props = {
// };

const useWebAuthn: UseWebAuthn = () => {
    const [ state, dispatch ] = useWebAuthnReducer();
    
    const register = () => {
        dispatch({ type: 'REGISTERING' });
        requestWebAuthnCredentials()
            .then((res) => {
                dispatch({ type: 'REGISTERED', payload: res as Credential });
            })
            .catch((err) => {
                dispatch({ type: 'REGISTER_ERROR', payload: err });
            })
    }
    
    const assertion = () => {
        dispatch({ type: 'ASSERTING' });
        assertWebAuthnCredential()
            .then((res) => {
                dispatch({ type: 'ASSERTED', payload: res as Credential });
            })
            .catch((err) => {
                dispatch({ type: 'ASSERT_ERROR', payload: err });
            })
    }
    
    return {
        register,
        assertion,
        state
    }
}

export default useWebAuthn;