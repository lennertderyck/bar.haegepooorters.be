import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../states/hooks/useAuth/useAuth';
import { Icon } from '../../basics';
import { TransactionList, WalletCard } from '../../elements';
import useAxiosBeta from '../../../states/hooks/useAxiosBeta/useAxiosBeta';
import useEndPoints from '../../../states/hooks/useEndpoints/useEndpoints';
import { Transaction } from '../../../types/wallet';

type Props = {
    children?: any;
};

const StartPage: FC<Props> = ({ children }) => {
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
        <div>
            <div className="px-8 pt-8 mb-6">
                <div className="pre-heading">Hi Lennert</div>
                <div className="heading">Overzicht</div>
            </div>
            <div className="px-8">
                <div className="mb-8">
                    <div className="flex justify-between items-baseline mb-2">
                        <h3 className="text-lg">Wallets</h3>
                        <Link to="user/wallets" className="label text-stone-500 flex items-center gap-1">
                            Bekijk wallets
                            <Icon name="arrow-right" size="1rem" />
                        </Link>
                    </div>
                    {mostValueWallet && <WalletCard wallet={ mostValueWallet } />}
                </div>
                <div>
                    <div className="flex justify-between items-baseline mb-2">
                        <h3 className="text-lg">Transacties</h3>
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
            {/* <div className="relative pointer-events-auto overflow-scroll scrollbar-hide flex flex-nowrap snap-x snap-mandatory max-w-full gap-5">
                { user?.wallets?.map(wallet => (
                    <div className="snap-center shrink-0 relative block">
                        <Link to={ `/wallets/${ wallet.id }` } className="block">
                                <div className="bg-gradient-to-r from-stone-200 via-stone-300 to-stone-400 p-5 rounded-xl">
                                <div>
                                    <h3 className="">{ wallet.provider.label }</h3>
                                    <h4 className="text-4xl">€ { wallet.balance }</h4>
                                </div>
                                <div className="label text-stone-500 flex items-center mt-3">
                                    <span>Saldo toevoegen</span>
                                    <Icon name="arrow-right" size="1rem" className="ml-1" />
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div> */}
            {/* <div className="absolute bottom-[-1px] left-0 right-0 bg-gradient-to-t from-white to-transparent h-2/3 w-full" /> */}
            {/* <div className="relative label flex items-center -mt-4 z-10">
                <span>Bekiijk alle wallets</span>
                <Icon name="arrow-right" className="ml-1" size="1rem" />
            </div> */}
        </div>
    )
}

export default StartPage;