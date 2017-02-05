import { RouterModule } from '@angular/router';
import { AboutComponent } from './components/about.component';
var routes = [
    { path: '', component: AboutComponent }
];
export var AboutRoutes = RouterModule.forChild(routes);
