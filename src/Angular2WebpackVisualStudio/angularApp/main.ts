// Entry point for JiT compilation.
declare var System: any;

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Enables Hot Module Replacement.
let module: any;
if (module.hot) {
    module.hot.accept();
}

platformBrowserDynamic().bootstrapModule(AppModule);
