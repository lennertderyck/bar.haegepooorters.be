import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import useAxiosBeta from '../../../states/hooks/useAxiosBeta/useAxiosBeta';
import useEndPoints from '../../../states/hooks/useEndpoints/useEndpoints';
import useShareRouting from '../../../states/hooks/useShareRouting/useShareRouting';
import { ID } from '../../../types/general';
import { Transaction } from '../../../types/wallet';
import { QR } from '../../basics';
import { Popover } from '../../elements';
import { PopoverProps } from '../../elements/popover/Popover';
import TransactionListItem from '../userPages/UserTransactionsPage/TransactionListItem';

interface Props extends Omit<PopoverProps, 'active'> {
    transactionId?: ID | undefined;
};

type TransactionShim = {
    transactionId: ID;
}

const TransactionShim: FC<TransactionShim> = ({ transactionId }) => {
    const endpoints = useEndPoints();
    const { data } = useAxiosBeta<Transaction>(endpoints.transactions.byId(transactionId));
    
    if (data) return (
        <TransactionListItem transaction={ data } showTimeStamp={ false } />
    )
    else return <>Loading...</>
}

const PurchaseProofPopover: FC<Props> = ({ transactionId, ...otherProps }) => {
    const [{ generateRoute }] = useShareRouting()
    const [ qrFocused, setQrFocused ] = useState(false)
    
    useEffect(() => {
        if (!!transactionId) {
            setQrFocused(false);
        }
    }, [ transactionId ])
    
    return (
        <Popover active={ !!transactionId } { ...otherProps }>
            <div onClick={() => qrFocused && setQrFocused(false)}>
                <div 
                    className={ classNames(
                        'flex justify-center mb-4 relative z-10',
                        qrFocused && 'translate-y-[150px] mt-[-75px]'
                    )}
                    onClick={() => setQrFocused(s => !s)}
                >
                    { transactionId && (
                        <QR value={ generateRoute('transaction', transactionId) } width={ qrFocused ? '150px' : '75px'} />
                    )}
                </div>
                <div className={ classNames(
                    qrFocused ? 'opacity-0' : 'opacity-100'
                )}>
                    { transactionId && <TransactionShim transactionId={ transactionId } />}
                </div>
            </div>
        </Popover>
    )
}

export default PurchaseProofPopover;