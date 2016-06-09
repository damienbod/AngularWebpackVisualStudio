import {Component, OnInit} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';

// Components.
import { HomeComponent } from './home/home.component';

@Component({
    selector: 'my-app',
    template: require( './app.component.html'),
    styles: [require('./app.component.scss')],
    directives: [ROUTER_DIRECTIVES]
})

@Routes([
    { path: '/home', component: HomeComponent }
])

export class AppComponent {

    constructor(
        private router: Router
    ) {
    }

    ngOnInit() {

        this.router.navigate(['/home']);
    }
}