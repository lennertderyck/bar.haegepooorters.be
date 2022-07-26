import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../../../components/basics';
import useAxiosBeta from '../../../../states/hooks/useAxiosBeta/useAxiosBeta';
import useEndPoints from '../../../../states/hooks/useEndpoints/useEndpoints';
import { User } from '../../../../types/verification';

type Props = {
};

const UsersOverviewPage: FC<Props> = () => {
    const { user } = useEndPoints();
    const { data: users} = useAxiosBeta<User[]>(user.all);
    
    return (
        <ul className="p-8">
            { users?.map((user) => (
                <li className="border-b border-stone-300 py-4">
                    <Link to={ user.id } className="flex items-center gap-8">
                        <div className="w-9 h-9 flex items-center justify-center bg-stone-100 rounded-full">
                            <Icon name="user" />
                        </div>
                        <div>
                            <h4 className="label text-stone-500">Name</h4>
                            <p>{ user.firstName } { user.lastName }</p>
                        </div>
                        <div>
                            <h4 className="label text-stone-500">Email</h4>
                            <p>{ user.email }</p>
                        </div>
                        <div>
                            <h4 className="label text-stone-500">Roles</h4>
                            <p>Admin, User</p>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default UsersOverviewPage;