import { useAutoAnimate } from '@formkit/auto-animate/react';
import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../../../states/hooks/useAuth/useAuth';
import useAxiosBeta from '../../../../states/hooks/useAxiosBeta/useAxiosBeta';
import useEndPoints from '../../../../states/hooks/useEndpoints/useEndpoints';
import { Transaction } from '../../../../types/wallet';
import Pricfy from '../../../basics/pricify/Pricify';
import { Popover, TransactionList } from '../../../elements';
import TransactionSummary from './TransactionSummary';

type Props = {
    children?: any;
};

const UserTransactionsPage: FC<Props> = ({ children }) => {
    const { id: requestedTransactionId } = useParams();
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
    
    useEffect(() => {
        if (!!transactions && !!requestedTransactionId) {
            const requestedTransaction = transactions.find((transaction) => transaction.id === requestedTransactionId);
            setSelectedTransaction(requestedTransaction);
        }
    }, [ transactions, requestedTransactionId ])
    
    return (
        <>
            <div className="p-8">
                <div className="mb-6">
                    <div className="pre-heading">Transacties</div>
                    <div className="heading">Overzicht</div>
                </div>
                <TransactionList 
                    transactions={ sortedTransactions } 
                    requestedTransaction={ requestedTransactionId }
                />
            </div>
        </>
    )
}

export default UserTransactionsPage;