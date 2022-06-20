import { FC } from 'react';
import { WalletListing } from '../../elements';

type Props = {
};

const WalletOverviewPage: FC<Props> = () => {
    return (
        <div className="p-8">
            <div className="mb-6">
                <div className="pre-heading">Wallets</div>
                <div className="heading">Overzicht</div>
            </div>
            
            <WalletListing />
        </div>
    )
}

export default WalletOverviewPage;