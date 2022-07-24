import { FC, useEffect, useState } from 'react';
import { ID } from '../../../types/general';
import { Transaction } from '../../../types/wallet';
import { verifyFunctionType } from '../../../utils/general';
import { AnimatedList } from '../../basics';
import TransactionSummary from '../../pages/userPages/UserTransactionsPage/TransactionSummary';
import Popover from '../popover/Popover';
import TransactionListItem from './TransactionListItem';

type Props = {
    transactions?: Transaction[];
    requestedTransaction?: ID;
    hidePopup?: boolean;
    onClick?: (transaction: Transaction) => void
};

const TransactionList: FC<Props> = ({ transactions, onClick, requestedTransaction, hidePopup = false }) => {
    const [ transactionPopupDetail, setTransactionPopupDetail ] = useState<Transaction>()
    
    useEffect(() => {
        if (!!transactions && !!requestedTransaction) {
            const result = transactions.find((transaction) => transaction.id === requestedTransaction);
            setTransactionPopupDetail(result);
        }
    }, [ transactions, requestedTransaction ])
    
    const deselectTransaction = () => {
        setTransactionPopupDetail(undefined)
    }
    
    const handleClick = (transaction: Transaction) => {
        if (!hidePopup) {
            setTransactionPopupDetail(transaction);
        }
        
        if (onClick) {
            onClick(transaction)
        }
    }
    
    return (
        <>
            <AnimatedList>
                { transactions?.map(transaction => (
                    <li 
                        className="py-4 border-b border-stone-300 last:border-b-0"
                        onClick={() => handleClick(transaction)}
                    >
                        <TransactionListItem transaction={ transaction } />
                    </li>
                ))}
            </AnimatedList>
            <Popover active={ !!transactionPopupDetail } onClose={ deselectTransaction }>
                { !!transactionPopupDetail && <TransactionSummary transaction={transactionPopupDetail} />}
            </Popover>
        </>
    )
}

export default TransactionList;