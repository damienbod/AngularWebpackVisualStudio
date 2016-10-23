import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'about-component',
    templateUrl: 'about.component.html'
})

export class AboutComponent implements OnInit {

    public message: string;

    constructor() {
        this.message = "Hello from AboutComponent constructor";
    }

    ngOnInit() {

    }
}
