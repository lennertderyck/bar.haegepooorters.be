import { FC } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../states/hooks/useAuth/useAuth';
import useAxiosBeta from '../../../states/hooks/useAxiosBeta/useAxiosBeta';
import useEndPoints from '../../../states/hooks/useEndpoints/useEndpoints';
import { Wallet, WalletProvider } from '../../../types/wallet';
import { Icon } from '../../basics';
import CreateWalletCard from '../createWalletCard/CreateWalletCard';
import WalletCard from '../walletCard/WalletCard';

type Props = {
};

const WalletListing: FC<Props> = () => {
    const endpoints = useEndPoints();
    const { user } = useAuth();
    const { data: wallets, refetch: refetchWallets } = useAxiosBeta<Wallet[]>(endpoints.user.wallets, {
        headers: {
            'Authorization': 'Bearer ' + user?.token
        }
    });
    const walletProviderStates = useAxiosBeta<WalletProvider[]>(endpoints.creditProviders.all);
    
    const createdWallets = wallets?.filter(wallet => {
        const isCreated = walletProviderStates.data?.find(provider => provider.id === wallet.provider.id);
        return isCreated;
    });

    return (
        <div>
            {
                wallets && walletProviderStates?.data?.map((provider) => {
                    const createdWallet = wallets?.find((w) => w.provider.id === provider.id);
                    
                    if (createdWallet) { return ( 
                        <Link to={ `/user/wallets/${ createdWallet.id }` } className="block mb-4 last:mb-0">
                            <WalletCard wallet={ createdWallet } key={ createdWallet.id } />
                        </Link>
                    )} else {
                        return (
                            <CreateWalletCard provider={ provider } onCreated={ refetchWallets } />
                        )
                    }
                })
            }
        </div>
    )
}

export default WalletListing;