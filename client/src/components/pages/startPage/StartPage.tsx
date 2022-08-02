import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../states/hooks/useAuth/useAuth';
import { Button, Icon } from '../../basics';
import { TransactionList, WalletCard } from '../../elements';
import useAxiosBeta from '../../../states/hooks/useAxiosBeta/useAxiosBeta';
import useEndPoints from '../../../states/hooks/useEndpoints/useEndpoints';
import { Transaction } from '../../../types/wallet';
import useQrScanPopover from '../../../states/hooks/useQrScanPopover/useQrScanPopover';

type Props = {
    children?: any;
};

const StartPage: FC<Props> = ({ children }) => {
    const { open } = useQrScanPopover();
    const navigate = useNavigate();
    const { user } = useAuth();
    const endpoints = useEndPoints();
    const { data: lastTransactions } = useAxiosBeta<Transaction[]>(endpoints.user.transactions + '?limit=3', {
        headers: {
            'Authorization': 'Bearer ' + user?.token
        }
    });
    
    const mostValueWallet = user?.wallets.sort((a, b) => b.balance - a.balance)[0];
    
    const sortedTransactions = lastTransactions?.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    });
        
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1">
                <div className="px-8 pt-8 mb-6">
                    <div className="pre-heading">Hi Lennert</div>
                    <div className="heading">Overzicht</div>
                </div>
                <div className="px-8">
                    <div className="mb-8">
                        <div className="flex justify-between items-baseline mb-2">
                            <h3 className="text-lg text--main">Wallets</h3>
                            <Link to="user/wallets" className="label text-stone-500 flex items-center gap-1">
                                Bekijk wallets
                                <Icon name="arrow-right" size="1rem" />
                            </Link>
                        </div>
                        {mostValueWallet && <WalletCard wallet={ mostValueWallet } />}
                    </div>
                    <div>
                        <div className="flex justify-between items-baseline mb-2">
                            <h3 className="text-lg text--main">Transacties</h3>
                            <Link to="user/transactions" className="label text-stone-500 flex items-center gap-1">
                                Bekijk transacties
                                <Icon name="arrow-right" size="1rem" />
                            </Link>
                        </div>
                        <TransactionList 
                            transactions={ sortedTransactions }
                            onClick={transaction => navigate('user/transactions/' + transaction.id)}
                        />
                    </div>
                </div>
            </div>
            <div className="sticky bottom-0 left-0 right-0 flex justify-center">
                <Button 
                    small 
                    fitWidth 
                    theme="secondary" 
                    icon="qr-code"
                    onClick={ open }
                >Code scannen</Button>
            </div>
        </div>
    )
}

export default StartPage;