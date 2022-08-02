import { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../../states/hooks/useAuth/useAuth';
import { User } from '../../../../types/verification';
import { Button } from '../../../basics';
import { Form, Input, PinVerification, Popover } from '../../../elements';

type Props = {
    children?: any;
};

const AddSessionPage: FC<Props> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [ showPinPad, setShowPinPad ] = useState(false);
    const [ email, setEmail ] = useState<string>();
    
    const handleSubmit = async (data: any) => {
        setEmail(data.email)
        setShowPinPad(true);
    }
    
    const handleVerificationComplete = (user: User) => {
        setShowPinPad(false)
        
        const redirectedPage = (location?.state as any)?.from;
        if (redirectedPage) {
            navigate(redirectedPage);
        } else {
            navigate('/');
        }
    }
    
    const handleVerificationError = () => {}
    
    return (
        <>
            <div className="p-8 h-full flex flex-col">
                <div className="mb-6">
                    <div className="pre-heading">Accounts</div>
                    <div className="heading">Toevoegen</div>
                </div>
                <Form onSubmit={ handleSubmit } className="flex-1 flex flex-col">
                    <div className="flex-1">
                        <Input name="email" type="email" placeholder="Emailadres" required />
                    </div>
                    <Button theme="main" type="submit">Volgende</Button>
                    <p className="text-center text-stone-500 text-sm mt-5">
                        <span className="font-semibold">Nog geen account?</span><br />
                        Vraag een account aan bij de stamleiding
                    </p>
                </Form>
            </div>
            <Popover active={ !!email && showPinPad } onClose={() => setShowPinPad(false)}>
                <PinVerification session={{ email: email || '' }} onComplete={ handleVerificationComplete } onError={ handleVerificationError } />
            </Popover>
        </>
        
    )
}

export default AddSessionPage;