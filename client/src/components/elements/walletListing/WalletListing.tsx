import { FC } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../states/hooks/useAuth/useAuth';
import WalletCard from '../walletCard/WalletCard';

type Props = {
};

const WalletListing: FC<Props> = () => {
    const { user } = useAuth();

    return (
        <div>
            { user?.wallets?.map(wallet => (
                <Link to={ `/wallets/${ wallet.id }` } className="block mb-4 last:mb-0">
                    <WalletCard wallet={ wallet } key={ wallet.id } />
                </Link>
            ))}
        </div>
    )
}

export default WalletListing;