import { RouterModule } from '@angular/router';
export var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'about', loadChildren: './about/about.module#AboutModule',
    }
];
export var AppRoutes = RouterModule.forRoot(routes);
