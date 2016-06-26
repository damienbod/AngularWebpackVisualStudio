import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: RouterConfig = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];