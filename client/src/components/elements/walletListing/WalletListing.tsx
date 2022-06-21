import { FC } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../states/hooks/useAuth/useAuth';
import useAxiosBeta from '../../../states/hooks/useAxiosBeta/useAxiosBeta';
import useEndPoints from '../../../states/hooks/useEndpoints/useEndpoints';
import { Wallet, WalletProvider } from '../../../types/wallet';
import { Icon } from '../../basics';
import WalletCard from '../walletCard/WalletCard';

type Props = {
};

const WalletListing: FC<Props> = () => {
    const endpoints = useEndPoints();
    const { user } = useAuth();
    const walletsState = useAxiosBeta<WalletProvider[]>(endpoints.creditProviders.all);
    
    const addWalletToUser = async (wallet: WalletProvider) => {
        
    }

    return (
        <div>
            {
                walletsState?.data?.map((provider) => {
                    const createdWallet = user?.wallets?.find((w) => w.provider.id === provider.id);
                    
                    if (createdWallet) { return ( 
                        <Link to={ `/wallets/${ createdWallet.id }` } className="block mb-4 last:mb-0">
                            <WalletCard wallet={ createdWallet } key={ createdWallet.id } />
                        </Link>
                    )} else {
                        return (
                            <div 
                                className="bg-stone-50 border border-stone-300 border-dashed p-5 rounded-xl"
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
                })
            }
            {/* { user?.wallets?.map(wallet => (
                <Link to={ `/wallets/${ wallet.id }` } className="block mb-4 last:mb-0">
                    <WalletCard wallet={ wallet } key={ wallet.id } />
                </Link>
            ))} */}
        </div>
    )
}

export default WalletListing;