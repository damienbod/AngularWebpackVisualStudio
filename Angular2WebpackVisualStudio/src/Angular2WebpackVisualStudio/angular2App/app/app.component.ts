import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'my-app',
    template: require('./app.component.html'),
    styles: [require('./app.component.scss'), require('../style/app.scss')],
    directives: [ROUTER_DIRECTIVES]
})


export class AppComponent {

    constructor(private router: Router) {
    }
}