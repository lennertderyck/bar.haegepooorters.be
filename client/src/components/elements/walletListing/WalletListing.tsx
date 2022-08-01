import { FC } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../states/hooks/useAuth/useAuth';
import useAxiosBeta from '../../../states/hooks/useAxiosBeta/useAxiosBeta';
import useEndPoints from '../../../states/hooks/useEndpoints/useEndpoints';
import { Wallet, CreditProvider } from '../../../types/wallet';
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

    const { data: availableCreditProviders } = useAxiosBeta<CreditProvider[]>(endpoints.user.availableCreditProviders, {
        headers: {
            'Authorization': 'Bearer ' + user?.token
        }
    })

    return (
        <div>
            <div className="mb-8">
                <h3 className="mb-4">Toegevoegde wallets</h3>
                {
                    wallets?.map(wallet => (
                        <Link to={ `/user/wallets/${ wallet.id }` } className="block mb-4 last:mb-0">
                            <WalletCard wallet={ wallet } key={ wallet.id } />
                        </Link>
                    ))
                }
            </div>
            
            <h3 className="mb-4">Beschikbare wallets</h3>
            { 
                availableCreditProviders?.length === 0 && <p className="text--secondary">Geen voorgestelde wallets beschikbaar</p>
            }
            {
                availableCreditProviders?.map(creditProvider => (
                    <div key={ creditProvider.id } className="mb-4 last:mb-0">
                        <CreateWalletCard provider={ creditProvider } />
                    </div>
                ))
            }
            {/* {
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
            } */}
        </div>
    )
}

export default WalletListing;