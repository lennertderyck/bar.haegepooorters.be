import classNames from 'classnames';
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
            <div className="mb-2">
                <h3 className="popover__title">Wallet</h3>
                <h4 className="popover__subtitle">Selecteer een wallet voor je aankoop</h4>
            </div>
            <ul className="mb-6">
                { user?.wallets.map(wallet => {
                    return (
                        <li 
                            key={ wallet.id } 
                            onClick={() => handleWalletSelect(wallet.id)}
                            className="flex items-center justify-between border-b last:border-b-0 border--themed py-4 text-lg"
                        >
                            <div className="flex justify-between items-baseline w-full">  
                                {  wallet.provider.label ? <span className="text--main">{ wallet.provider.label }</span> : <span className="text--secondary">Geen naam</span> }
                                <span className="text-stone-400"><Pricify>{ wallet.balance }</Pricify></span>
                            </div>
                            <Icon name="check" className={ classNames(
                                'ml-4 text--main',
                                selectedWallet?.id === wallet.id ? 'opacity-100' : 'opacity-0'
                            )} />
                        </li>
                    )
                })}
            </ul>
            <p className="text-stone-400 text-center text-sm">Deze voorkeur blijft behouden<br/>bij volgende aankopen</p>
        </Popover>
    )
}

export default WalletSelector;