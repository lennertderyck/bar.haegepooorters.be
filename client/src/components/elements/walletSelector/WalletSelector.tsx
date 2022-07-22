import { FC } from 'react';
import useAuth from '../../../states/hooks/useAuth/useAuth';
import { ID } from '../../../types/general';
import { Wallet } from '../../../types/wallet';
import { Icon, Pricify } from '../../basics';
import Popover from '../popover/Popover';

type Props = {
    children?: any;
    active: boolean;
    onClose: () => void;
    onSelect?: (wallet: Wallet) => void;
};

const WalletSelector: FC<Props> = ({ active, onClose, onSelect }) => {
    const { user, selectedWallet, selectWallet } = useAuth();
    
    const handleWalletSelect = (wallet: ID) => {
        selectWallet(wallet)
        
        if(!!onSelect) {
            onSelect(user?.wallets.find(w => w.id === wallet) as Wallet);
        }
    }
    
    return (
        <Popover {...{ active, onClose }}>
            <div className="mb-6">
                <h3 className="text-2xl font-semibold text-center">Wallet</h3>
                <h4 className="text-stone-400 text-center font-medium text-lg">Selecteer een wallet voor je aankoop</h4>
            </div>
            <ul className="mb-6">
                { user?.wallets.map(wallet => {
                    return (
                        <li 
                            key={ wallet.id } 
                            onClick={() => handleWalletSelect(wallet.id)}
                            className="flex items-center justify-between border-b last:border-b-0 border-stone-200 py-4 text-lg"
                        >
                            <p>  
                                { wallet.provider.label } <span className="text-stone-400">(<Pricify>{ wallet.balance }</Pricify>)</span>
                            </p>
                            { selectedWallet?.id === wallet.id && <Icon name="check" /> }
                        </li>
                    )
                })}
            </ul>
            <p className="text-stone-400 text-center text-sm">Deze voorkeur blijft behouden<br/>bij volgende aankopen</p>
        </Popover>
    )
}

export default WalletSelector;