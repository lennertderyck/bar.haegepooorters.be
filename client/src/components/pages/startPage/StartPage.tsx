import axios from 'axios';
import { FC, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../states/hooks/useAuth/useAuth';
import useAxiosBeta from '../../../states/hooks/useAxiosBeta/useAxiosBeta';
import { Wallet } from '../../../types/wallet';
import { WalletCard, WalletListing } from '../../elements';
import { useLazyAxios } from 'use-axios-client';
import { Icon } from '../../basics';

type Props = {
    children?: any;
};

const StartPage: FC<Props> = ({ children }) => {
    const { user } = useAuth();
        
    return (
        <div>
            <div className="px-8 pt-8 mb-6">
                <div className="pre-heading">Hi Lennert</div>
                <div className="heading">Overzicht</div>
            </div>
            
            <div className="relative pointer-events-auto overflow-scroll scrollbar-hide flex flex-nowrap snap-x snap-mandatory max-w-full gap-5">
                { user?.wallets?.map(wallet => (
                    <div className="snap-center shrink-0 relative block">
                        <Link to={ `/wallets/${ wallet.id }` } className="block">
                                <div className="bg-gradient-to-r from-stone-200 via-stone-300 to-stone-400 p-5 rounded-xl">
                                <div>
                                    <h3 className="text-4xl">€ { wallet.balance }</h3>
                                </div>
                                <div className="label text-stone-500 flex items-center mt-3">
                                    <span>Saldo toevoegen</span>
                                    <Icon name="arrow-right" size="1rem" className="ml-1" />
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            {/* <div className="absolute bottom-[-1px] left-0 right-0 bg-gradient-to-t from-white to-transparent h-2/3 w-full" /> */}
            {/* <div className="relative label flex items-center -mt-4 z-10">
                <span>Bekiijk alle wallets</span>
                <Icon name="arrow-right" className="ml-1" size="1rem" />
            </div> */}
        </div>
    )
}

export default StartPage;