// This optional code is used to register a service worker.
// register() is not called by default.

import { cacheNotice, onUpdateFoundHandler } from "./swUtils/handlers";

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://cra.link/PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

let registeredServiceWorker: ServiceWorkerRegistration | undefined;

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

const cartNotify = (register: ServiceWorkerRegistration) => {
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
}

export const register = (config?: Config) => {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }
    
    return new Promise<ServiceWorkerRegistration | undefined>((resolve, reject) => {
      window.addEventListener('load', async () => {
        try {
          const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
          if (isLocalhost) {
            // This is running on localhost. Let's check if a service worker still exists or not.
            checkValidServiceWorker(swUrl, config);
  
            // Add some additional logging to localhost, pointing developers to the
            // service worker/PWA documentation.
            await navigator.serviceWorker.ready;
            cacheNotice();
          } else {
            // Is not localhost. Just register service worker
            const registration = await registerValidSW(swUrl, config);
            resolve(registration);
            if (registration) {
              cartNotify(registration);
            }
          }
        } catch (error) {
          reject(error);
        }
      });
    })
  }
}

const registerValidSW = async (swUrl: string, config?: Config): Promise<ServiceWorkerRegistration | undefined> => {
  try {
    const registration = await navigator.serviceWorker.register(swUrl);
    registration.onupdatefound = onUpdateFoundHandler(registration, config);
    
    return registration;
  } catch (error) {
    console.error('Error during service worker registration:', error);
  }
}

const checkValidServiceWorker = async (swUrl: string, config?: Config) => {
  try {
    // Check if the service worker can be found. If it can't reload the page.
    const response = await fetch(swUrl, {
      headers: { 'Service-Worker': 'script' },
    })
    
    const contentType = response.headers.get('content-type');
    if (
      response.status === 404 ||
      (contentType != null && contentType.indexOf('javascript') === -1)
    ) {
      // No service worker found. Probably a different app. Reload the page.
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();
      window.location.reload();
    } else {
      // Service worker found. Proceed as normal.
      registeredServiceWorker = await registerValidSW(swUrl, config);
    }
  } catch (error) {
    console.log('No internet connection found. App is running in offline mode.');
  }
}

export const unregister = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready
      registration.unregister();
      
      if (registeredServiceWorker) {
        registeredServiceWorker = undefined;
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }
}

// const notify = new Notification('Ging je iets kopen?', {
//   body: 'Er zitten nog items in je winkelmandje. Ga verder met je bestelling.',
//   actions: [
//     {
//       title: 'Winkelmandje leegmaken',
//       action: 'empty_cart',
//     },
//     {
//       title: 'Bestelling afwerken',
//       action: 'proceed',
//     }
//   ]
// })
