import { ComponentPropsWithoutRef, FC, forwardRef, useCallback, useEffect } from 'react';
import useAuth from '../../../states/hooks/useAuth/useAuth';
import { Pin, Session, User } from '../../../types/verification';
import { CodePad } from '../../elements';

interface Props {
    session: Session;
    onComplete?: (data: User) => void;
    onError?: (error: any) => void;
};

const PinVerification: FC<Props> = ({ session, onComplete, onError }) => {
    const { login, loginRetry, user, loading, error } = useAuth();
    
    const handleComplete = (value: Pin) => {
        login({
            pin: value.join(''),
            email: session.user.email
        })
    }
    
    const handleOnChange = useCallback(() => {
        if (error) {
            console.log('retry')
            loginRetry()
        }
    }, [ error ])
    
    useEffect(() => {
        if (user && !loading && typeof onComplete === 'function') {
            onComplete(user.user);
        }
    }, [ user, loading ])
    
    useEffect(() => {
        if (error && typeof onError === 'function') {
            onError(error);
        }
    }, [error])
    
    return <CodePad onComplete={ handleComplete } loading={ loading } error={ error } onChange={ handleOnChange } />
}

export default PinVerification;