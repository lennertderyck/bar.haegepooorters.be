import { FC } from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import AuthContextProvider from '../states/contexts/AuthContext/AuthContext';
import CartContextProvider from '../states/contexts/CartContext/CartContext';
import App from './App/App';
// @ts-ignore
import SlideRoutes from 'react-slide-routes';
import FrontView from './FrontView/FrontView';


type Props = {
};

const SitesRoot: FC<Props> = () => {
    return (<>
        <BrowserRouter basename="app">
            <App />
        </BrowserRouter>
        <BrowserRouter>
            <FrontView />
        </BrowserRouter>
    </>);
}

export default SitesRoot;