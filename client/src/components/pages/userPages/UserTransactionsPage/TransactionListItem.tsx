import { FC } from 'react';
import { Transaction } from '../../../../types/wallet';
import dayjs from 'dayjs';
import Pricfy from '../../../basics/pricify/Pricify';

type Props = {
    transaction: Transaction;
};

const TransactionListItem: FC<Props> = ({ transaction }) => {    
    const transactionTotal = transaction.items.reduce((acc, item) => {
        const subtitle = item.amount * item.product.price;
        return acc + subtitle;
    }, 0);
    
    const formatted = dayjs().calendar(new Date(transaction.createdAt), {
        sameDay: '[Vandaag om] HH:mm',
        nextDay: '[Gisteren om] HH:mm',
        nextWeek: 'dddd',
        lastDay: '[Morgen]',
        lastWeek: '[Last] dddd',
        sameElse: 'DD MMMM [om] HH:mm'
    })
    
    return (
        <>
            <h3 className="text-2xl font-semibold">{ formatted }</h3>
            
            <div className="flex justify-between mt-4">
                <span>Wallet</span>
                <span className="font-semibold">{ transaction?.wallet.provider.label }</span>
            </div>
            <p className="text-stone-400 text-sm">Geselecteerde wallet</p>
                        
            <div className="flex justify-between mt-4">
                <span>Subtotaal</span>
                <span className="font-semibold"><Pricfy>{ transactionTotal }</Pricfy></span>
            </div>
            <p className="text-stone-400 text-sm">Totaal van alle items</p>
                                    
            <div className="flex justify-between mt-4">
                <span>Boete</span>
                <span className="font-semibold">+ 0%</span>
            </div>
            <p className="text-stone-400 text-sm">Achterstallige betaling</p>
        </>
    )
}

export default TransactionListItem;