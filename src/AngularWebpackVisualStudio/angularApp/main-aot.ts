import './styles.scss';

import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';


// Entry point for AoT compilation.
declare var System: any;

// Styles.
enableProdMode();

platformBrowser().bootstrapModule(AppModule);
