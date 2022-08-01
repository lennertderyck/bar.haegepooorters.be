import classNames from 'classnames';
import { FC } from 'react';
import { Wallet } from '../../../types/wallet';
import { Icon, Pricify } from '../../basics';
// import styles from './WalletCard.module.scss';

type Props = {
    wallet: Wallet;
    onlyBalance?: boolean;
};

const WalletCard: FC<Props> = ({ wallet, onlyBalance }) => {
    return (
        <div 
            className={ classNames(
                'bg-gradient-to-r from-stone-200 via-stone-300 to-stone-400 dark:bg-black p-5 rounded-xl select-none'
            )}
        >
            <div>
                { !onlyBalance && <h4>
                    { wallet.provider.label ? 
                        <span className="text--main">{ wallet.provider.label }</span> :
                        <span className="text--secondary">Geen naam</span>
                    }
                </h4>}
                <h3 className="text-4xl text--main"><Pricify>{ wallet.balance || 0 }</Pricify></h3>
            </div>
            {/* <div className="label text-stone-500 flex items-center mt-3">
                <span>Saldo toevoegen</span>
                <Icon name="arrow-right" size="1rem" className="ml-1" />
            </div> */}
        </div>
    )
}

export default WalletCard;