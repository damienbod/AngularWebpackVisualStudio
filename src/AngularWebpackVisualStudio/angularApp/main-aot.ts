import './styles.scss';

import 'zone.js';
import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { AppModuleNgFactory } from './app/app.module.ngfactory';

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);