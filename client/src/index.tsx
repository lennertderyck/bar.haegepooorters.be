import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/nl-be'
import SitesRoot from './sites/SitesRoot';

dayjs.extend(relativeTime)
dayjs.extend(calendar)
dayjs.extend(updateLocale)
dayjs.locale('nl-be');
dayjs.updateLocale('en', {
  calendar: {
    lastDay: '[Gisteren at] LT',
    sameDay: '[Vandaag om] LT',
    nextDay: '[Morgen om] LT',
    lastWeek: '[last] dddd [om] LT',
    nextWeek: 'dddd [om] LT',
    sameElse: 'L'
  }
})

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
try {
  const register = await serviceWorkerRegistration.register();
  window.addEventListener('unload', () => {
    if (Notification.permission === 'granted') {
      const notify = register?.showNotification('Ging je iets kopen?', {
        body: 'Er zitten nog items in je winkelmandje. Ga verder met je bestelling.',
        actions: [
          {
            title: 'Winkelmandje leegmaken',
            action: 'empty_cart',
          },
          {
            title: 'Bestelling afwerken',
            action: 'proceed',
          }
        ]
      })
    }
  })
} catch (error) {
  console.log(error); 
}
