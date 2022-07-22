import { FC, useEffect, useRef, useState } from 'react';
import { Button } from '../../basics';
import { PinVerification, Popover } from '../../elements';
import { User } from '../../../types/verification';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../../states/hooks/useAuth/useAuth';

type Props = {
    children?: any;
};

const LoginPage: FC<Props> = ({ children }) => {
    const { id } = useParams();
    const authState = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [ showPinPad, setShowPinPad ] = useState(false);
    
    const handleVerificationComplete = (user: User) => {
        setShowPinPad(false)
        
        const redirectedPage = (location?.state as any)?.from;
        if (redirectedPage) {
            navigate(redirectedPage);
        } else {
            navigate('/');
        }
    }
    
    const handleVerificationError = (error: any) => {}
    
    const login = () => {
        setShowPinPad(true);
    }
    
    if (!id) return <Navigate to="/session" replace />
    
    const selectedSession = authState.getSessionById(id);
    
    if (!selectedSession) return <Navigate to="/session" replace />
    
    return <>
        <div className="p-8 h-full flex flex-col">
            <div className="flex-1">
                <div className="pre-heading">Hi, { selectedSession.user.firstName }</div>
                <div className="heading">Verifieer dat jij het bent</div>
            </div>
            <Button onClick={ login } loading={ authState.loading } className="mb-4">Aanmelden</Button>
            <Link to="/session">
                <Button secondary>Ander account</Button>
            </Link>
        </div>
        
        <Popover active={ showPinPad } onClose={() => setShowPinPad(false)}>
            <PinVerification session={ selectedSession } onComplete={ handleVerificationComplete } onError={ handleVerificationError } />
        </Popover>
    </>
}

export default LoginPage;