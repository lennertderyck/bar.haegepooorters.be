import React, { FC } from 'react';
import {
    BrowserRouter,
} from "react-router-dom";
import App from './App/App';
// @ts-ignore
import SlideRoutes from 'react-slide-routes';
import FrontView from './FrontView/FrontView';
import BackOffice from './BackOffice/BackOffice';
import useFlags from '../states/hooks/useFlags/useFlags';
import classNames from 'classnames';

type Props = {
};

const SitesRoot: FC<Props> = () => {
    const darkMode = useFlags(s => s.flagById('dark_mode'));
    
    return (<div className={ classNames(
        'h-full',
        darkMode?.state === true && 'dark',
    )}>
        <div className="bg-white dark:bg-stone-900 h-full">
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