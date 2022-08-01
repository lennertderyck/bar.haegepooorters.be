import { FC, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import useAuth from '../../../../states/hooks/useAuth/useAuth';
import { Button, Icon } from '../../../basics';
import { Session, User } from '../../../../types/verification';
import { PinVerification, Popover } from '../../../elements';

type Props = {
};

const SessionIndexPge: FC<Props> = () => {
    const navigate = useNavigate();
    const { sessions } = useAuth();
    const [ selectedSession, selectSession ] = useState<Session>();
    
    const handleSessionSelect = (session: Session) => {
        selectSession(session);
    }
    
    const handleVerificationComplete = (user: User) => {
        selectSession(undefined);
        navigate('/');
    }
    
    const handleVerificationError = (error: any) => {}

    return (
        <>
            <div className="p-8 h-full flex flex-col">
                <div className="flex-1">
                    <div className="mb-8">
                        <div className="pre-heading">Accounts</div>
                        <div className="heading">Selecteer je account</div>
                    </div>
                    { sessions.map(session => {
                        const lastSession = dayjs(session.lastAccess).fromNow()
                
                        return (
                            <div
                                onClick={() => handleSessionSelect(session)}
                                title={ `Laatst aangemeld ${lastSession}` }
                                className="py-4 flex items-center gap-x-4 border-b border-stone-300 dark:border-stone-700"
                            >
                                <Icon name="user" size="1.6rem" className="text--main" />
                                <div>
                                    <h3 className="text-lg leading-4 text--main">{ session.user.firstName }</h3>
                                    <p className="text-stone-500 dark:text-stone-400">{ session.user.email }</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Link to="/session/new">
                    <Button secondary>Ander account</Button>
                </Link>
            </div>
            <Popover active={ !!selectedSession } onClose={() => selectSession(undefined)}>
                <PinVerification session={{ email: selectedSession?.user.email || '' }} onComplete={ handleVerificationComplete } onError={ handleVerificationError } />
            </Popover>
        </>
    )
}

export default SessionIndexPge;