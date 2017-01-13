// Entry point for AoT compilation.

import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { AppModuleNgFactory } from '../aot/angular2App/app/app.module.ngfactory';

declare var System: any;

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
