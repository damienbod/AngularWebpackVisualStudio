import { Routes, RouterModule } from '@angular/router';

declare var System: any;

export const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        loadChildren: './modules/about/about.module#AboutModule',
        //loadChildren: './modules/about/about.module.ngfactory#AboutModuleNgFactory',
        path: 'about'
    }
];


export const routing = RouterModule.forRoot(appRoutes);

////loadChildren: () => System.import('./modules/about/about.module').then(function (module: any) {
////    return module['AboutModule'];
////})

////loadChildren: () => new Promise(function (resolve) {
////    (require as any).ensure([], function (require: any) {
////        resolve(require('./modules/about/about.module.ngfactory')['AboutModuleNgFactory']);
////    });
////})   

////loadChildren: './modules/about/about.module.ngfactory#AboutModuleNgFactory',