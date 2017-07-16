import './styles.scss';

import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { AppModuleNgFactory } from '../aot/angularApp/app/app.module.ngfactory';

// Entry point for AoT compilation.
declare var System: any;

// Styles.
enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
