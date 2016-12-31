import { AboutComponent } from './components/about.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'about', component: AboutComponent }
];

export const AboutRoutes = RouterModule.forChild(routes);