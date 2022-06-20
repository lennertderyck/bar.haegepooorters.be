import classNames from 'classnames';
import { FC } from 'react';
import { CartItem } from '../../../types/bar';
import { Pricify } from '../../basics';
import ProductAddButton from './ProductAddButton';
import ProductRemoveButton from './ProductRemoveButton';

type Props = {
    product: CartItem;
    onInfoDisplay?: () => void;
    onAddItem?: () => void;
    onRemoveItem?: () => void;
};

const ProductCard: FC<Props> = ({ product, onInfoDisplay, onAddItem, onRemoveItem }) => {
    const handleInfoDisplay = () => {
        if (typeof onInfoDisplay === 'function') {
            onInfoDisplay()
        }
    }
    
    const handleItemAdd = () => {
        if (typeof onAddItem === 'function') {
            onAddItem()
        }
    }
    
    const handleItemRemove = () => {
        if (typeof onRemoveItem === 'function') {
            onRemoveItem()
        }
    }
    
    return (
        <div 
            key={ product.id }
            className="flex items-center justify-between py-5 border-b border-stone-300 last:border-b-0"
        >
            <div className={ classNames('flex-1', !product.available && 'opacity-50') } onClick={ handleInfoDisplay }>
                <h3 className="text-lg leading-5">{ product.name } – <Pricify>{ product.price }</Pricify></h3>
                <p className="text-stone-500">{ product.category.name } – { product.quantity }</p>
            </div>
            { product.available && (
                <div className="flex items-center gap-2">
                    {( onRemoveItem && product.amount > 0 ) && <ProductRemoveButton onClick={ handleItemRemove } />}
                    { onAddItem && <ProductAddButton amount={ product.amount } onClick={ handleItemAdd } />}
                </div>
            )}
        </div>
    )
}

export default ProductCard;