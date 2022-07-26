import { FC, ReactElement } from 'react';
import useAuth from '../../../../states/hooks/useAuth/useAuth';

type Props = {
    children?: ReactElement | ReactElement[];
};

const UserProfilePage: FC<Props> = ({ children }) => {
    const { user } = useAuth();
    
    return (
        <div className="p-8">
            <div className="mb-6">
                <div className="pre-heading">Hi { user?.user.firstName }</div>
                <div className="heading">Profiel</div>
            </div>
            <div>
                Je kan je profiel hier binnenkort beheren.
            </div>
        </div>
    )
}

export default UserProfilePage;