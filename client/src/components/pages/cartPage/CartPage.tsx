import classNames from 'classnames';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../../states/hooks/useCart/useCart';
import { Button, Icon } from '../../basics';
import Pricfy from '../../basics/pricify/Pricify';
import { Popover, ProductCard } from '../../elements';

type Props = {
    children?: any;
};

const CartPage: FC<Props> = ({ children }) => {
    const [ showConfirm, setShowConfirm ] = useState(false);
    const [ showPriceDetails, setShowPriceDetails ] = useState(false);
    const { items, addItem, removeSingle, total } = useCart();
    
    return (
        <>
            <div className="pt-8 h-full flex flex-col">
                <div className="mb-6 px-8">
                    <div className="pre-heading">Bar</div>
                    <div className="heading">Winkelmandje</div>
                </div>
                
                <div className="flex-1 px-8">
                    { items?.map((item) => {                    
                        return (
                            <ProductCard 
                                key={ item.id }
                                product={ item }
                                onAddItem={() => addItem(item)}
                                onRemoveItem={() => removeSingle(item)}
                            />
                        )
                    })}
                    
                    { items?.length === 0 && (
                        <>
                            <p className="text-stone-500 text-lg">Je winkelmandje is nog leeg</p>
                            <Link to="/bar">
                                <Button secondary className="mt-4">Items toevoegen</Button>
                            </Link>
                        </>
                    )}
                </div>
                
                <div className="border-t border-stone-200 pt-8 px-8 relative">
                    <button 
                        onClick={() => setShowPriceDetails(!showPriceDetails)}
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-200 rounded-full p-1"
                    >
                        <Icon name="arrow-up-s" className={ classNames(showPriceDetails && 'rotate-180') } />
                    </button>
                    
                    <div className={ classNames(
                        'overflow-hidden',
                        showPriceDetails ? 'opacity-100 max-h-[100vh] pb-6' : 'opacity-0 max-h-0 pb-0' 
                    )}>
                        <div className="flex justify-between">
                            <span>Subtotaal</span>
                            <span className="font-semibold"><Pricfy>{ total }</Pricfy></span>
                        </div>
                        <p className="text-stone-400 text-sm">Totaal van alle items</p>
                        
                        <div className="flex justify-between mt-4">
                            <span>Boete</span>
                            <span className="font-semibold">+ 0%</span>
                        </div>
                        <p className="text-stone-400 text-sm">Achterstallige betaling</p>
                    </div>
                    
                    <Button icon="arrow-right" onClick={() => setShowConfirm(true)}>
                        <div className="flex items-center justify-between w-full mr-2">
                            <span>Afrekenen</span>
                            <span><Pricfy>{ total }</Pricfy></span>
                        </div>
                    </Button>
                </div>
            </div>
            <Popover active={ showConfirm } onClose={() => setShowConfirm(false)}>
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold text-center">Je aankoop bevestigen</h3>
                    <h4 className="text-stone-400 text-center font-medium text-lg">Bevestig dat je <Pricfy>{ total }</Pricfy> zal betalen</h4>
                </div>
                <div className="mb-6">
                    <div className="flex justify-between">
                        <span>Subtotaal</span>
                        <span className="font-semibold"><Pricfy>{ total }</Pricfy></span>
                    </div>
                    <p className="text-stone-400 text-sm">Totaal van alle items</p>
                            
                    <div className="flex justify-between mt-4">
                        <span>Boete</span>
                        <span className="font-semibold">+ 0%</span>
                    </div>
                    <p className="text-stone-400 text-sm">Achterstallige betaling</p>
                </div>
                <Button icon="arrow-right">
                    Aankoop bevestigen
                </Button>
            </Popover>
        </>
    )
}

export default CartPage;