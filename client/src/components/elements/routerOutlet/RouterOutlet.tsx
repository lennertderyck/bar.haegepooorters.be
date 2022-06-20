import { FC } from 'react';
import { Outlet } from 'react-router-dom';

type Props = {
};

const RouterOutlet: FC<Props> = () => {
    return <Outlet />
}

export default RouterOutlet;