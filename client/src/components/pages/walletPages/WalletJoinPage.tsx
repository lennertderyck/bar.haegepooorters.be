import { FC, ReactElement, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAxiosBeta from '../../../states/hooks/useAxiosBeta/useAxiosBeta';
import useEndPoints from '../../../states/hooks/useEndpoints/useEndpoints';
import { Button } from '../../basics';
import { useAxios, useLazyAxios } from 'use-axios-client';
import useAuth from '../../../states/hooks/useAuth/useAuth';
import { useEffectOnce } from '../../../states/hooks/useEffectOnce/useEffectOnce';
import { CreditProvider, Wallet } from '../../../types/wallet';
import { Form, Input, Popover } from '../../elements';
import { ID } from '../../../types/general';
import axios from 'axios';

type Props = {
    children?: ReactElement | ReactElement[];
};

interface Response {
    available: boolean;
    creditProvider: CreditProvider;
    wallet?: Wallet;
}

const requestProvider = async (url: string, userToken: string) => {
    const response = await axios({
        url,
        headers: {
            Authorization: `Bearer ${ userToken }`,
        }
    })
    
    return response.data as Response;
}

const WalletJoinPage: FC<Props> = ({ children }) => {
    const navigate = useNavigate();
    const [ isCreating, setIsCreating ] = useState(false);
    const { user } = useAuth();
    const { id: requestedId } = useParams();
    const endpoints = useEndPoints();
    const [requestedProvider, setRequestedProvider] = useState<Response | null>(null)
    
    useEffectOnce(() => {
        if (!!requestedId) {
            const response = requestProvider(endpoints.user.availableCreditProviderById(requestedId), user?.token || '');
            response.then(p => setRequestedProvider(p))
        }
    })
    
    const handleSubmit = (formData: any) => {
        const response = requestProvider(endpoints.user.availableCreditProviderById(formData.requestedId), user?.token || '');
        response.then(p => setRequestedProvider(p))
    }
    
    const joinCreditProvider = async (providerId: ID) => {
        setIsCreating(true);
        try {
            const response = await axios(endpoints.user.addWallet, {
                method: 'POST',
                data: {
                    provider: providerId
                },
                headers: {
                    'Authorization': 'Bearer ' + user?.token
                }
            })
            navigate('/user/wallets');
            setIsCreating(false);
        } catch (error) {
            alert('We konden geen wallet aanmaken. Probeer opnieuw.');
            setIsCreating(false);
        }
    }
    
    return (
        <>
            <div className="pt-8 px-8 h-full flex flex-col">
                <div className="mb-6">
                    <div className="pre-heading">Wallets</div>
                    <div className="heading">Deelnemen aan wallet</div>
                </div>
                <Form onSubmit={ handleSubmit } className="flex-1 flex flex-col">
                    <div className="flex-1"> 
                        <Input defaultValue={ requestedId } name="requestedId" required placeholder="Code uitnodiging" />
                    </div>
                    <Button>Volgende</Button>
                </Form>
            </div>
            <Popover active={ requestedProvider !== null} onClose={() => setRequestedProvider(null)}>
                { requestedProvider?.available && (
                    <>
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold">Bevestig je deelname</h3>
                            <h4 className="text-stone-400 font-medium text-lg">{ requestedProvider.creditProvider?.label }</h4>
                        </div>
                        <Button onClick={() => joinCreditProvider(requestedProvider.creditProvider?.id)} loading={ isCreating }>Deelnemen</Button>
                        <p className="text-stone-500 text-center text-sm mt-6">Deze wallet wordt toegevoegd aan je account. Hierna kan je er crediet aan toevoegen.</p>
                        {/* <p>Standaard crediet: 0 euro</p> */}
                    </>
                )}
                
                { !requestedProvider?.available && requestedProvider && (
                    <>
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold">Je neemt al deel</h3>
                            <h4 className="text-stone-400 font-medium text-lg">Wallet al beschikbaar</h4>
                        </div>
                        <p className="text-stone-600 my-6">Deze wallet werd al toegevoegd aan je account en is beschikbaar.</p>
                        <Link to={ '/user/wallets/' + requestedProvider.wallet?.id }>
                            <Button secondary icon="arrow-right">Naar wallet</Button>
                        </Link>
                    </>
                )}
            </Popover>
        </>
    )
}

export default WalletJoinPage;