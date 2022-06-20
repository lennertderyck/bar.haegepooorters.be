import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages';

type Props = {
    children?: any;
};

const FrontView: FC<Props> = ({ children }) => {
    return (
        <Routes>
            <Route path="/" element={ <HomePage /> } />
        </Routes>
    )
}

export default FrontView;