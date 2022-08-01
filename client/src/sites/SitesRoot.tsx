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
    return (<div className="dark">
        <div className="bg-white dark:bg-stone-900">
            <BrowserRouter basename="app">
                <App />
            </BrowserRouter>
            <BrowserRouter basename="backoffice">
                <BackOffice />
            </BrowserRouter>
            <BrowserRouter>
                <FrontView />
            </BrowserRouter>
        </div>
    </div>);
}

export default SitesRoot;