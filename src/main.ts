import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
// if ('serviceWorker' in navigator) {

//   window.addEventListener('load', function() {

//   navigator.serviceWorker.register('../dist/pwademo/ngsw-worker.js').then(function(registration) {
//       // Registration was successful

//   console.log('ServiceWorker registration successful with scope: ', registration.scope);

//   },
//   function(err) {
//       // registration failed :(

//   console.log('ServiceWorker registration failed: ', err); });

//   });
// }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

