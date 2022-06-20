import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import SitesRoot from './sites/SitesRoot';

dayjs.extend(relativeTime)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SitesRoot />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
