import './styles.scss';

import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';

// Styles.
enableProdMode();

platformBrowser().bootstrapModule(AppModule);
