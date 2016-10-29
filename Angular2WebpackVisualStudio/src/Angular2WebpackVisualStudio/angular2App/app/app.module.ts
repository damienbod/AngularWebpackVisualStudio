import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { Configuration } from './app.constants';
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { TestDataService } from './services/testDataService';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        routing,
        HttpModule
    ],
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent
    ],
    providers: [
        TestDataService,
        Configuration,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent],
})

export class AppModule { }