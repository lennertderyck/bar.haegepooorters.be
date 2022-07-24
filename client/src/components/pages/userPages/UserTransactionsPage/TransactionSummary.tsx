import { FC, useState } from 'react';
import { Transaction } from '../../../../types/wallet';
import dayjs from 'dayjs';
import Pricfy from '../../../basics/pricify/Pricify';
import { toast } from 'react-toastify';
import { ExspansionPane, Icon } from '../../../basics';

type Props = {
    transaction: Transaction;
    showTimeStamp?: boolean;
};

const TransactionSummary: FC<Props> = ({ transaction, showTimeStamp = true }) => {
    const [ showProducts, setShowProducts ] = useState(false)      
    const transactionTotal = transaction.items.reduce((acc, item) => {
        const subtitle = item.amount * item.product.price;
        return acc + subtitle;
    }, 0);
    
    const formattedDate = dayjs(dayjs(transaction.createdAt)).calendar(dayjs(), {
        sameDay: '[Vandaag om] HH:mm',
        nextDay: '[Morgen om] HH:mm',
        nextWeek: 'dddd [om] HH:mm',
        lastDay: '[Gisteren om] HH:mm',
        lastWeek: 'dddd [om] HH:mm',
        sameElse: 'DD MMMM [om] HH:mm'
    })
    
    const copyTransactionId = () => {
        navigator.clipboard.writeText(transaction.id);
        toast('Transactie-ID gekopieerd')
    }
    
    return (
        <>
            { showTimeStamp && <h3 className="text-2xl font-semibold first-letter:uppercase mb-4">{ formattedDate }</h3>}
            
            <div className="flex justify-between">
                <span>Wallet</span>
                <span className="font-semibold">{ transaction?.wallet.provider.label }</span>
            </div>
            <p className="text-stone-400 text-sm">Gebruikte wallet</p>
                        
            <div className="flex justify-between mt-4">
                <span>Subtotaal</span>
                <span className="font-semibold"><Pricfy>{ transactionTotal }</Pricfy></span>
            </div>
            <p className="text-stone-400 text-sm">Totaal van alle items</p>
                                    
            <div className="flex justify-between mt-4">
                <span>Boete</span>
                <span className="font-semibold">+ 0%</span>
            </div>
            <p className="text-stone-400 text-sm">Toeslag achterstallige betalingen</p>
            
            <hr className="my-4" />
            
            <div 
                onClick={() => setShowProducts(s => !s)}
                className="flex items-center justify-between" 
            >
                <h3 className="text-stone-500 whitespace-nowrap">
                    { transaction.items.length } items gekocht
                </h3>
                <div className={ showProducts ? 'rotate-180' : 'rotate-0' }>
                    <Icon 
                        name="arrow-down-s" 
                        className="text-stone-500" 
                    />
                </div>
            </div>
            
            <ExspansionPane active={ showProducts }>
                <ul className="mt-2">
                    { transaction.items.map(item => (
                        <li className="flex items-center mb-1">
                            { item.amount } <Icon name="close" size="1rem" className="mx-2" /> { item.product.name }
                        </li>
                    )) }
                </ul>
            </ExspansionPane>
            
            <hr className="my-4" />
            
            <button className="flex justify-between" onClick={ copyTransactionId }>
                <span className="text-stone-400 label whitespace-nowrap pr-4">Transactie</span>
                <span className="text-stone-500 label whitespace-nowrap text-ellipsis overflow-hidden">{ transaction.id }</span>
            </button>
        </>
    )
}

export default TransactionSummary;