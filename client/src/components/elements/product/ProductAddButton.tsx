import classNames from 'classnames';
import { FC } from 'react';
import { Icon } from '../../basics';

type Props = {
    amount: number;
    onClick?: () => void;
};

const ProductAddButton: FC<Props> = ({ amount, onClick }) => {
    const isEmpty = amount === 0;
    
    const handleClick = () => {
        if (typeof onClick === 'function') {
            onClick();
        }
    }
    
    return (
        <button
            onClick={ handleClick }
            className={ classNames(
                'rounded-full flex items-center w-fit',
                isEmpty ? 'border border-black p-1.5' : 'bg-black text-white pl-3 pr-2 py-1.5',
            )}
        >
            { !isEmpty && <span className="font-semibold">{ amount }</span>}
            <Icon name="add" className={ classNames( !isEmpty && 'ml-2')} />
        </button>
    )
}
export default ProductAddButton;