import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './components/about.component';

const routes: Routes = [
    { path: '', component: AboutComponent }
];

export const AboutRoutes = RouterModule.forChild(routes);
