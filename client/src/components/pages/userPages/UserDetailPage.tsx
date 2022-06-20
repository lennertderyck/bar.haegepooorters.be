import { FC } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../states/hooks/useAuth/useAuth';
import { Icon } from '../../basics';

type Props = {
    children?: any;
};

const menuItems = [
    {
        label: 'Profiel',
        subLabel: 'lennyderyck@gmail.com',
        icon: 'account-circle',
        route: '/user/account',
    },
    {
        label: 'Wallets',
        subLabel: '3 beschikbaar',
        icon: 'wallet',
        route: '/user/wallets',
    },
    {
        label: 'Transacties',
        icon: 'history',
        route: '/user/transactions',
    },
]

const UserDetailPage: FC<Props> = ({ children }) => {
    const { user } = useAuth();
    
    return (
        <div className="p-8">
            <div className="mb-6">
                <div className="pre-heading">Hi { user?.user.firstName }</div>
                <div className="heading">Account</div>
            </div>
            { menuItems.map(({ label, icon, route, subLabel }) => (
                <Link to={ route } className="w-full border-b border-stone-200 flex items-baseline py-4">
                    <Icon name={ icon } className="mr-4 translate-y-1" />
                    <div>
                        <span className="block text-lg leading-5">{ label }</span>
                        <span className="block text-stone-400">{ subLabel }</span>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default UserDetailPage;