import { HomeModule } from './modules/home/home.module';
import { AboutModule } from './modules/about/about.module';
import { SharedModule } from './modules/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { Configuration } from './app.constants';
import { Routes, RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';

import { AppComponent } from './app.component';

declare var System: any;

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
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