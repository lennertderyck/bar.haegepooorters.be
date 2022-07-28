import { FC } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../../states/hooks/useAuth/useAuth';
import { Icon } from '../../../basics';
import AccountSwitchButton from './AccountSwitchButton';

type Props = {
    children?: any;
};

const UserDetailPage: FC<Props> = ({ children }) => {
    const { user } = useAuth();
    
    const menuItems = [
        {
            label: 'Profiel',
            subLabel: 'lennyderyck@gmail.com',
            icon: 'account-circle',
            route: '/user/account',
            append: <AccountSwitchButton />
        },
        {
            label: 'Wallets',
            subLabel: user?.wallets.length + ' beschikbaar',
            icon: 'wallet',
            route: '/user/wallets',
        },
        {
            label: 'Transacties',
            icon: 'history',
            route: '/user/transactions',
        },
        {
            label: 'Flags',
            icon: 'flag',
            route: '/flags',
        },
    ]
    
    return (
        <div className="p-8">
            <div className="mb-6">
                <div className="pre-heading">Hi { user?.user.firstName }</div>
                <div className="heading">Account</div>
            </div>
            { menuItems.map(({ label, icon, route, subLabel, append }) => (
                <div className="w-full border-b border-stone-200 flex items-baseline py-4">
                    <Icon name={ icon } className="mr-4 translate-y-1" />
                    <div className="w-full">
                        <Link to={ route } className="w-full">
                            <span className="block text-lg leading-5">{ label }</span>
                            <span className="block text-stone-400">{ subLabel }</span>
                        </Link>
                        
                        { append }
                    </div>
                </div>
            ))}
        </div>
    )
}

export default UserDetailPage;