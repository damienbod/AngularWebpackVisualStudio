import { AboutRoutes } from './about.routes';
import { AboutComponent } from './components/about.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        AboutRoutes
    ],

    declarations: [
        AboutComponent
    ],

    exports: [
        AboutComponent
    ]
})

export class AboutModule { }