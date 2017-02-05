import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
var routes = [
    { path: 'home', component: HomeComponent }
];
export var HomeRoutes = RouterModule.forChild(routes);
