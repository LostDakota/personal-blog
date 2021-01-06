import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if (window['Zone']) {
  bootstrap();
} else {
  import('zone.js/dist/zone')
      .then(() => bootstrap());
}

function bootstrap() {
  platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.log(err));
}