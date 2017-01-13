import { Routes, RouterModule } from '@angular/router';
import { AboutModule } from 'modules/about/about.module';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'about',  loadChildren: 'modules/about/about.module#AboutModule' }
];


export const routing = RouterModule.forRoot(appRoutes);