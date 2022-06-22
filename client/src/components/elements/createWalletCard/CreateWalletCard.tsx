import { FC } from 'react';
import { WalletProvider } from '../../../types/wallet';
import { Icon } from '../../basics';
import useEndPoints from '../../../states/hooks/useEndpoints/useEndpoints';
import axios from 'axios';
import useAuth from '../../../states/hooks/useAuth/useAuth';

type Props = {
    provider: WalletProvider;
    onCreated?: () => void;
    onError?: () => void;
};

const CreateWalletCard: FC<Props> = ({ provider, onCreated, onError }) => {
    const { user } = useAuth();
    const endpoints = useEndPoints();
    
    const addWalletToUser = async () => {
        try {
            await axios(endpoints.user.addWallet, { 
                method: 'POST',
                data: {
                    provider: provider.id
                },
                headers: {
                    'Authorization': 'Bearer ' + user?.token
                }
            });
            if (!!onCreated) { 
                onCreated()
            }
        } catch {
            if (!!onError) {
                onError()
            } 
        }  
    }
    
    return (
        <div 
            onClick={ addWalletToUser }
            className="bg-stone-50 border border-stone-300 border-dashed p-5 rounded-xl select-none"
        >
            <div>
                <h3 className="text-xl text-stone-500">{ provider.label }</h3>
            </div>
            <div className="label text-stone-500 flex items-center mt-1">
                <span>Wallet aanmaken</span>
                <Icon name="add" size="1rem" className="ml-1" />
            </div>
        </div>
    )
}

export default CreateWalletCard;