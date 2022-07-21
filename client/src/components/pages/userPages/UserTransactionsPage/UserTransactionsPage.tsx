import { useAutoAnimate } from '@formkit/auto-animate/react';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import useAuth from '../../../../states/hooks/useAuth/useAuth';
import useAxiosBeta from '../../../../states/hooks/useAxiosBeta/useAxiosBeta';
import useEndPoints from '../../../../states/hooks/useEndpoints/useEndpoints';
import { Transaction } from '../../../../types/wallet';
import Pricfy from '../../../basics/pricify/Pricify';
import { Popover } from '../../../elements';
import TransactionListItem from './TransactionListItem';

type Props = {
    children?: any;
};

const UserTransactionsPage: FC<Props> = ({ children }) => {
    const [ selectedTransaction, setSelectedTransaction ] = useState<Transaction>()
    const [ animationParent ] = useAutoAnimate<HTMLUListElement>()
    const endpoints = useEndPoints()
    const { user } = useAuth();
    const { data: transactions } = useAxiosBeta<Transaction[]>(endpoints.user.transactions, {
        headers: {
            'Authorization': 'Bearer ' + user?.token
        }
    });    
    
    const sortedTransactions = transactions?.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    });
    
    return (
        <>
            <div className="p-8">
                <div className="mb-6">
                    <div className="pre-heading">Transacties</div>
                    <div className="heading">Overzicht</div>
                </div>
                <ul ref={ animationParent }>
                    { sortedTransactions?.map((transaction) => {
                        const transactionTotal = transaction.items.reduce((acc, item) => {
                            const subtitle = item.amount * item.product.price;
                            return acc + subtitle;
                        }, 0);
                        
                        return (
                            <li className="py-4 border-b border-stone-300 last:border-b-0" onClick={() => setSelectedTransaction(transaction)}>
                                <div className="flex items-center justify-between">
                                    <h3>{ dayjs(transaction.createdAt).fromNow() }</h3>
                                    <h4><Pricfy>{ transactionTotal }</Pricfy></h4>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <Popover active={ !!selectedTransaction } onClose={() => setSelectedTransaction(undefined)}>
                { !!selectedTransaction && <TransactionListItem transaction={selectedTransaction} />}
            </Popover>
        </>
    )
}

export default UserTransactionsPage;