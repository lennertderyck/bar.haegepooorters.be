import { FC, ReactElement } from 'react';
import useAuth from '../../../../states/hooks/useAuth/useAuth';
import { Button, Icon } from '../../../basics';

type Props = {
    children?: ReactElement | ReactElement[];
};

const AccountSwitchButton: FC<Props> = ({ children }) => {
    const { logout } = useAuth();
    
    return (
        <div className="mt-4">
            <Button theme="simple" fitWidth onClick={() => logout()} simple small icon="arrow-left-right" iconPlacement="prepend">Gebruiker wisselen</Button>
        </div>
    )
}

export default AccountSwitchButton;