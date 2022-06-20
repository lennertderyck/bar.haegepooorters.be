import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../states/hooks/useAuth/useAuth';
import { useEffectOnce } from '../../../states/hooks/useEffectOnce/useEffectOnce';

type Props = {
    children?: any;
};

const ProtectedRoute: FC<Props> = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated, latestSession } = useAuth();
    const location = useLocation();
    
    useEffectOnce(() => {
        if (!isAuthenticated) {
            navigate('/session/' + latestSession?.id, { state: { from: location.pathname }, replace: true });
        }
    })
    
    return children
}

export default ProtectedRoute;