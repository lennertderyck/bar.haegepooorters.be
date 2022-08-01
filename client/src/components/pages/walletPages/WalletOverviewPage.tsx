import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../basics';
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
            <Link to="join">
                <Button secondary small className="mt-8">Heb je een code?</Button>
            </Link>
        </div>
    )
}

export default WalletOverviewPage;