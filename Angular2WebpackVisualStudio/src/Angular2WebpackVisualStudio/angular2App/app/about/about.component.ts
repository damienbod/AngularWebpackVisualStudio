import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';

@Component({
    selector: 'about',
    template: require('./about.component.html'),
    directives: [CORE_DIRECTIVES]
})

export class AboutComponent implements OnInit {

    public message: string;

    constructor() {
        this.message = "Hello from About";
    }

    ngOnInit() {
       
    }
}
