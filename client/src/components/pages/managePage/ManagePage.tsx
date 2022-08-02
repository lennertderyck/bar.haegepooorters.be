import { FC, ReactElement } from 'react';
import useAuth from '../../../states/hooks/useAuth/useAuth';
import useAxiosBeta from '../../../states/hooks/useAxiosBeta/useAxiosBeta';
import useEndPoints from '../../../states/hooks/useEndpoints/useEndpoints';
import { User } from '../../../types/verification';
import { AnimatedList, Icon } from '../../basics';

type Props = {
    children?: ReactElement | ReactElement[];
};

const ManagePage: FC<Props> = ({ children }) => {
    const endpoints = useEndPoints();
    const { user } = useAuth();
    const { data: users } = useAxiosBeta<User[]>(endpoints.user.all, {
        headers: {
            Authorization: `Bearer ${user?.token}`,
        }
    });
    
    return (
        <div className="p-8">
            <div className="mb-6">
                <div className="pre-heading">Beheer</div>
                <div className="heading">Gebruikers</div>
            </div>
            <div className="mb-4">
                Beheerders kunnen hier binnenkort gebruikers beheren.
            </div>
            <ul>
                <AnimatedList>
                    { users?.map((user) => (
                        <li key={user.id} className="flex items-center py-4 border-b border--themed">
                            <Icon name="user" size="1.6rem" className="text--main mr-4" />
                            <div>
                                <h3 className="text-lg leading-4 text--main">{ user.firstName }</h3>
                                <p className="text-stone-500 dark:text-stone-400">{ user.email }</p>
                            </div>
                        </li>
                    ))}
                </AnimatedList>
            </ul>
        </div>
    )
}

export default ManagePage;