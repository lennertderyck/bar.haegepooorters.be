import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAuth from '../../../states/hooks/useAuth/useAuth';
import { Icon } from '../../basics';
import { WalletCard } from '../../elements';

type Props = {
    children?: any;
};

const WalletDetailPage: FC<Props> = ({ children }) => {
    const { user } = useAuth();
    const { id } = useParams();
    
    const selectedWallet = user?.wallets?.find(wallet => wallet.id === id);
    
    if (!selectedWallet) return <div>Wallet not found</div>
    
    return (
        <div className="p-8">
            <Link to={'..'} className="label mb-4 text-stone-400 flex items-center">
                <Icon name="arrow-left" className="mr-1" size="1rem" />
                <span>Wallet overview</span>
            </Link>
            <div className="mb-6">
                <div className="pre-heading">Wallet</div>
                <div className="heading">{ selectedWallet.label }</div>
            </div>
            <WalletCard wallet={ selectedWallet } onlyBalance />
        </div>
    )
}

export default WalletDetailPage;