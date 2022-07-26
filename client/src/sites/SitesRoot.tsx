import React, { FC } from 'react';
import {
    BrowserRouter,
} from "react-router-dom";
import App from './App/App';
// @ts-ignore
import SlideRoutes from 'react-slide-routes';
import FrontView from './FrontView/FrontView';
import BackOffice from './BackOffice/BackOffice';

type Props = {
};

const SitesRoot: FC<Props> = () => {
    return (<>
        <BrowserRouter basename="app">
            <App />
        </BrowserRouter>
        <BrowserRouter basename="backoffice">
            <BackOffice />
        </BrowserRouter>
        <BrowserRouter>
            <FrontView />
        </BrowserRouter>
    </>);
}

export default SitesRoot;