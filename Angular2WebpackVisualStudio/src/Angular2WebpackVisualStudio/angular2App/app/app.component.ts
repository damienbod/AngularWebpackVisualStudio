import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'my-app',
    template: require('./app.component.html'),
    styles: [String(require('./app.component.scss')), String(require('../style/app.scss'))]
})


export class AppComponent {

    constructor(private router: Router) {
    }
}