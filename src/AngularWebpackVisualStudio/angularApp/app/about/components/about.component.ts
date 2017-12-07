import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about-component',
    templateUrl: './about.component.html'
})

export class AboutComponent implements OnInit {

    message: string;

    ngOnInit() {
        this.message = 'Hello from AboutComponent constructor';
    }
}
