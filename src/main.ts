import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// if the zone has already been loaded, go ahead an bootstrap the app
if (window['Zone']) {
  bootstrap();

// otherwise, wait to bootstrap the app until zone.js is imported
} else {
  import('zone.js/dist/zone')
      .then(() => bootstrap());
}

function bootstrap() {
  platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.log(err));
}