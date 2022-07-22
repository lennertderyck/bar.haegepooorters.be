import classNames from 'classnames';
import { FC, useState } from 'react';
import useAxiosBeta from '../../../states/hooks/useAxiosBeta/useAxiosBeta';
import useCart from '../../../states/hooks/useCart/useCart';
import { CartItem, Product } from '../../../types/bar';
import { Button, Icon } from '../../basics';
import Pricfy from '../../basics/pricify/Pricify';
import { Popover, ProductCard, WalletSelector } from '../../elements';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import useAuth from '../../../states/hooks/useAuth/useAuth';
import useEndPoints from '../../../states/hooks/useEndpoints/useEndpoints';
import { toast } from 'react-toastify';
import PurchaseProofPopover from './PurchaseProofPopover';
import { ID } from '../../../types/general';

type ProductDetailPopupProps = {
    selectedProduct: Product;
    onClose: () => void;
}

const ProductDetailPopup: FC<ProductDetailPopupProps> = ({ selectedProduct, onClose }) => {
    const { getItem, addItem, removeSingle } = useCart();
    
    const cartitem = getItem(selectedProduct);
    const itemNotInCart = cartitem.amount === 0;
    
    const handleClose = () => {
        if (typeof onClose === 'function') {
            onClose();
        }
    }
    
    return (
        <Popover active={ !!selectedProduct } onClose={ handleClose }>
            { selectedProduct && (
                <>
                    <h3 className="text-2xl font-semibold text-center">{ selectedProduct.name }</h3>
                    <h4 className="text-stone-400 text-center font-medium text-lg"><Pricfy>{ selectedProduct.price }</Pricfy></h4>
                    
                    {!selectedProduct.available && <div className="text-center mt-4 text-stone-400">Item niet beschikbaar</div>}
                        
                    { selectedProduct.available && (
                        <>
                            <div className={ classNames('flex mt-8') }>
                                <div className={ classNames('overflow-hidden', itemNotInCart ? 'opacity-0 max-w-[0vw] pr-0' : 'opacity-100 max-w-[100vw] pr-4')}>
                                    <button 
                                        disabled={ itemNotInCart }
                                        onClick={() => removeSingle(selectedProduct)}
                                        className="rounded-full p-2 bg-stone-200 w-12 h-12 flex items-center justify-center"
                                    >
                                        <Icon name="subtract" size="1.6rem" />
                                    </button>
                                </div>
                                <button 
                                    onClick={() => addItem(selectedProduct)}
                                    className="flex-1 flex justify-between bg-black text-white rounded-full py-3 pl-4 pr-2"
                                >
                                    <span className="font-medium">{ cartitem.amount || 0 } items</span>
                                    <span className="flex items-center">
                                        (<Pricfy>{( selectedProduct.price || 0) * (cartitem.amount || 0)}</Pricfy>)
                                        <Icon name="add" size="1.6rem" className="ml-1" />
                                    </span>
                                </button>
                            </div>
                            {/* <div className={ classNames('overflow-hidden', itemNotInCart ? 'opacity-0 max-h-[0vw] pt-0' : 'opacity-100 max-h-[100vw] pt-6') }>
                                <Button 
                                    secondary 
                                    simple 
                                    onClick={() => {
                                        removeItem(selectedProduct);
                                        onClose();
                                    }}
                                >
                                    All items verwijderen
                                </Button>
                            </div> */}
                        </>
                    )}
                </>
            )}
        </Popover>
    )
}

type Props = {
};

const ProductsListPage: FC<Props> = () => {
    const [ purchaseProofId, setPurchaseProofId ] = useState<ID | undefined>()
    const endpoints = useEndPoints();
    const { selectedWallet } = useAuth();
    const [ showWalletSelect, setShowWalletSelect ] = useState(false);
    const [ showConfirm, setShowConfirm ] = useState(false);
    const [ showPriceDetails, setShowPriceDetails ] = useState(false);
    const [ animationParent ] = useAutoAnimate<HTMLUListElement>()
    const [ selectedProduct, setSelectedProduct ] = useState<CartItem>()
    const { addItem, getItem, removeSingle, total, purchase, startPurchase, items } = useCart();
    const { data } = useAxiosBeta<Product[]>(endpoints.products.all);
        
    const handleCartAdd = (item: Product) => {
        addItem(item);
    }
    
    const handlePurchase = () => {
        if (selectedWallet) {
            setShowConfirm(true)
        } else {
            setShowWalletSelect(true);
        }
    }
    
    const handlePurchaseConfirm = async () => {
        const purchase = await startPurchase();
        setShowConfirm(false);
        // toast('Aankoop geslaagd!')
        setPurchaseProofId(purchase.data.id)
    }
        
    const mergedCartProducts = (data || [])
        .map((product) => {
            const itemInCart = getItem(product);
            
            return {
                ...product,
                ...itemInCart
            }
        }).sort((A, B) => {
            
        if (A.amount === 0) {
            return 1;
        } else if (B.amount === 0) {
            return -1;
        } else {
            return 0;
        }
    })
        
    const positiveBalance = !!selectedWallet && selectedWallet?.balance >= total;
    
    return (
        <div className="flex h-full flex-col">
            <div className="p-8 flex-1">
                <div className="mb-6">
                    <div className="pre-heading">Bar</div>
                    <div className="heading">Overzicht</div>
                </div>
                
                <ul ref={ animationParent }>
                    { mergedCartProducts?.map((product) => {                    
                        return (
                            <ProductCard
                                key={ product.id } 
                                product={ product }
                                onInfoDisplay={() => setSelectedProduct(product)}
                                onRemoveItem={() => removeSingle(product)}
                                onAddItem={() => {
                                    setSelectedProduct(product);
                                    handleCartAdd(product)
                                }}
                            />
                        )
                    })}
                </ul>
            </div>
            
            <div className={ classNames(
                'sticky bottom-0 left-0 right-0 bg-white',
                items.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
            )}>
                <div className="border-t border-gray-300 px-8 pt-8">
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
                            
                        <Button secondary icon="arrow-right-s" className="mt-6" onClick={() => setShowWalletSelect(true)}>{ selectedWallet?.provider?.label || 'Selecteer een wallet'}</Button>
                    </div>
                        
                    <Button 
                        disabled={ !positiveBalance }
                        icon="arrow-right" 
                        onClick={ handlePurchase }
                    >
                        <div className="flex items-center justify-between w-full mr-2">
                            <span>Afrekenen</span>
                            <span><Pricfy>{ total }</Pricfy></span>
                        </div>
                    </Button>
                    
                    { !positiveBalance && (
                        <div className="text-red-600 text-center text-sm w-fit bg-red-100 py-1.5 px-3 mx-auto rounded-b-2xl">
                            Je hebt te weinig tegoed
                        </div>
                    )}
                </div>
            </div>
            
            { selectedProduct && <ProductDetailPopup
                selectedProduct={ selectedProduct }
                onClose={() => setSelectedProduct(undefined)}
            />}
            
            <WalletSelector active={ showWalletSelect } onClose={() => setShowWalletSelect(false)} />
            
            <Popover active={ showConfirm } onClose={() => setShowConfirm(false)}>
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold text-center">Je aankoop bevestigen</h3>
                    <h4 className="text-stone-400 text-center font-medium text-lg">Bevestig dat je <Pricfy>{ total }</Pricfy> zal betalen</h4>
                </div>
                <div className="mb-6">
                    <div className="flex justify-between">
                        <span>Wallet</span>
                        <span className="font-semibold">{ selectedWallet?.provider.label }</span>
                    </div>
                    <p className="text-stone-400 text-sm">Geselecteerde wallet</p>
                    
                    <div className="flex justify-between mt-4">
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
                <Button icon="arrow-right" loading={ purchase.loading } onClick={ handlePurchaseConfirm }>
                    Aankoop bevestigen
                </Button>
            </Popover>
            
            <PurchaseProofPopover
                transactionId={ purchaseProofId } 
                onClose={() => setPurchaseProofId(undefined)}
            />
        </div>
    )
}

export default ProductsListPage;