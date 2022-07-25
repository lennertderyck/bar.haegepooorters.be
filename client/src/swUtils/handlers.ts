export const onUpdateFoundHandler = (registration: any, config: any) => () => {
    const installingWorker = registration.installing;
    if (installingWorker == null) {
      return;
    }
    installingWorker.onstatechange = () => {
      if (installingWorker.state === 'installed') {
        if (navigator.serviceWorker.controller) {
          // At this point, the updated precached content has been fetched,
          // but the previous service worker will still serve the older
          // content until all client tabs are closed.
          console.log(
            'New content is available and will be used when all ' +
              'tabs for this page are closed. See https://cra.link/PWA.'
          );
    
          // Execute callback
          if (config && config.onUpdate) {
            config.onUpdate(registration);
          }
        } else {
          // At this point, everything has been precached.
          // It's the perfect time to display a
          // "Content is cached for offline use." message.
          console.log('Content is cached for offline use.');
    
          // Execute callback
          if (config && config.onSuccess) {
            config.onSuccess(registration);
          }
        }
      }
    };
};

export const cacheNotice = () => console.log(
    'This web app is being served cache-first by a service ' +
      'worker. To learn more, visit https://cra.link/PWA'
);