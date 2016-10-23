import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'about-component',
    template: 'about.component.html'
})

export class AboutComponent implements OnInit {

    public message: string;

    constructor() {
        this.message = "Hello from About";
    }

    ngOnInit() {

    }
}
