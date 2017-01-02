import { HomeModule } from './modules/home/home.module';
import { AboutModule } from './modules/about/about.module';
import { SharedModule } from './modules/shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './app.routes';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        SharedModule.forRoot(),
        AboutModule,
        HomeModule
    ],

    declarations: [
        AppComponent
    ],

    bootstrap: [AppComponent],
})

export class AppModule { }