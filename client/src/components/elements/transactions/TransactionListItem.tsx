import dayjs from 'dayjs';
import { FC } from 'react';
import { Transaction } from '../../../types/wallet';
import Pricfy from '../../basics/pricify/Pricify';

type Props = {
    transaction: Transaction;
};

const TransactionListItem: FC<Props> = ({ transaction }) => {
    const transactionTotal = transaction.items.reduce((acc, item) => {
        const subtitle = item.amount * item.product.price;
        return acc + subtitle;
    }, 0);
    
    return (
        <div className="flex items-center justify-between">
            <h3>{ dayjs(transaction.createdAt).fromNow() }</h3>
            <h4><Pricfy>{ transactionTotal }</Pricfy></h4>
        </div>
    )
}

export default TransactionListItem;