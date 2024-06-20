import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { BuilderModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(BuilderModule)
  .catch((err) => console.error(err));
